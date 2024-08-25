import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-06-20",
});

export async function GET(req: NextRequest, res: NextResponse) {
    const sessionId = req.nextUrl.searchParams.get("session_id") || "";

    if (!sessionId || typeof sessionId !== "string") {
        return NextResponse.json(
            { message: "Session ID is required" },
            { status: 400 }
        );
    }

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status === "paid") {
            return NextResponse.json({ payment_status: "paid" });
        } else {
            return NextResponse.json({ payment_status: "unpaid" });
        }
    } catch (error) {
        console.error("Error retrieving Stripe session:", error);
        return NextResponse.json(
            { message: "Session ID is required" },
            { status: 500 }
        );
    }
}
