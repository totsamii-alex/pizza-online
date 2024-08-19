"use server";

import { prisma } from "@/prisma/prismaClient";
import { PayOrderTemplate } from "@/shared/components";
import { CheckoutFormValues } from "@/shared/constans";
import { createPayment, sendEmail } from "@/shared/lib";
import { OrderStatus } from "@prisma/client";
import { cookies } from "next/headers";

export async function createOrder(data: CheckoutFormValues) {
    try {
        const cookieStore = cookies();
        const cartToken = cookieStore.get("cartToken")?.value;

        if (!cartToken) {
            throw new Error("Cart token not found");
        }

        /* Finding a cart by token */
        const userCart = await prisma.cart.findFirst({
            where: {
                token: cartToken,
            },
            include: {
                user: true,
                items: {
                    include: {
                        ingredients: true,
                        productItem: {
                            include: {
                                product: true,
                            },
                        },
                    },
                },
            },
        });

        /* If the cart is not found, we return an error */
        if (!userCart) {
            throw new Error("Cart not found");
        }

        /* If the cart is empty we return an error */
        if (userCart?.totalAmount === 0) {
            throw new Error("Cart is empty");
        }

        /* Create an order */
        const order = await prisma.order.create({
            data: {
                token: cartToken,
                fullname: data.firstName + " " + data.lastName,
                email: data.email,
                phone: data.phone,
                address: data.address,
                comment: data.comment,
                totalAmount: userCart.totalAmount,
                status: OrderStatus.PENDING,
                items: JSON.stringify(userCart.items),
            },
        });

        const paymentData = await createPayment({
            amount: order.totalAmount,
            orderId: order.id,
            description: "Оплата заказа #" + order.id,
        });

        if (!paymentData) {
            throw new Error("Payment data not found");
        }

        // /* Emptying the Cart */
        await prisma.cart.update({
            where: {
                id: userCart.id,
            },
            data: {
                totalAmount: 0,
            },
        });

        await prisma.cartItem.deleteMany({
            where: {
                cartId: userCart.id,
            },
        });

        await prisma.order.update({
            where: {
                id: order.id,
            },
            data: {
                paymentId: paymentData.id,
            },
        });

        // Sending an email
        await sendEmail(
            data.email,
            "Online Pizza / Pay for order #" + order.id,
            PayOrderTemplate({
                orderId: order.id,
                totalAmount: order.totalAmount,
                paymentUrl: paymentData.url || "",
            })
        );

        return paymentData.url;
    } catch (err) {
        console.log("[CreateOrder] Server error", err);
    }
}
