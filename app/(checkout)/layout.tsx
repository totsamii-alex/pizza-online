import { Container, Header } from "@/shared/components/shared";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Online Pizza | Checkout",
    description:
        "Complete your order and checkout at Online Pizza. Enjoy our delicious pizzas delivered to your doorstep.",
    openGraph: {
        title: "Online Pizza | Checkout",
        description:
            "Complete your order and checkout at Online Pizza. Enjoy our delicious pizzas delivered to your doorstep.",
        url: "https://pizza-online-rho.vercel.app/checkout",
        type: "website",
        images: [
            {
                url: "",
                width: 1200,
                height: 630,
                alt: "Online Pizza Checkout",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Online Pizza | Checkout",
        description:
            "Complete your order and checkout at Online Pizza. Enjoy our delicious pizzas delivered to your doorstep.",
        images: "https://pizza-online-rho.vercel.app/logo.png",
        site: "@yourtwitterhandle",
    },
};

export default function CheckoutLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="min-h-screen bg-secondary">
            <Container>
                <Suspense>
                    <Header
                        hasSearch={false}
                        hasCart={false}
                        className="border-b-gray-200"
                    />
                </Suspense>

                {children}
            </Container>
        </main>
    );
}
