import { NextRequest, NextResponse } from "next/server";
import { Stripe } from "stripe";
import { prisma } from "@/prisma/prismaClient";
import { OrderStatus } from "@prisma/client";
import { sendEmail } from "@/shared/lib";
import {
    OrderExpiredTemplate,
    OrderFailedTemplate,
    OrderProcessingTemplate,
    OrderSuccessTemplate,
} from "@/shared/components";
import { CartItemDto } from "@/shared/services/dto/cartDto";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-06-20",
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(req: NextRequest) {
    const sig = req.headers.get("stripe-signature") as string;

    const rawBody = await req.arrayBuffer();
    const buf = Buffer.from(rawBody);

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
    } catch (error: any) {
        console.log(`Webhook error: ${error.message}`);
        return NextResponse.json(
            { error: `Webhook error: ${error.message}` },
            { status: 400 }
        );
    }

    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.order_id;

    if (!orderId) {
        return NextResponse.json(
            { error: "Order ID not found in session metadata" },
            { status: 400 }
        );
    }

    const order = await prisma.order.findFirst({
        where: {
            id: Number(orderId),
        },
    });

    if (!order) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    switch (event.type) {
        case "checkout.session.completed":
            console.log("Payment completed");

            await prisma.order.update({
                where: { id: Number(order.id) },
                data: { status: OrderStatus.SUCCEEDED },
            });

            const items = JSON.parse(order.items as string) as CartItemDto[];

            await sendEmail(
                order.email,
                "Next Pizza / Your order has been successfully placed 🎉",
                OrderSuccessTemplate({ orderId: order.id, items })
            );

            break;

        case "checkout.session.async_payment_failed":
            console.log("Payment async_payment_failed");

            await prisma.order.update({
                where: { id: Number(order.id) },
                data: { status: OrderStatus.CANCELLED },
            });

            await sendEmail(
                order.email,
                "Next Pizza / Payment Failed",
                OrderFailedTemplate({ orderId: order.id })
            );

            break;

        case "checkout.session.async_payment_succeeded":
            console.log("Payment async_payment_succeeded");

            await sendEmail(
                order.email,
                "Next Pizza / Your order is being processed 🛠️",
                OrderProcessingTemplate({ orderId: order.id })
            );

            break;

        case "checkout.session.expired":
            console.log("Payment expired");

            await prisma.order.update({
                where: { id: Number(order.id) },
                data: { status: OrderStatus.EXPIRED },
            });

            await sendEmail(
                order.email,
                "Next Pizza / Payment Expired",
                OrderExpiredTemplate({ orderId: order.id })
            );

            break;

        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
}
