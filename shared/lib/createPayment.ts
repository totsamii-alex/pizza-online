import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-06-20",
});

interface createPaymentProps {
    description: string;
    orderId: number;
    amount: number;
}

export async function createPayment(details: createPaymentProps) {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card", "blik", "p24"],
            line_items: [
                {
                    price_data: {
                        currency: "pln",
                        product_data: {
                            name: details.description,
                        },
                        unit_amount: details.amount * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${process.env.STRIPE_SUCCESS_URL}?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.STRIPE_CANCEL_URL}?session_id={CHECKOUT_SESSION_ID}`,
            metadata: {
                order_id: details.orderId.toString(),
            },
        });

        return session;
    } catch (error) {
        console.error("Error creating Stripe session:", error);
        throw error;
    }
}
