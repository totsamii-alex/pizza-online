import { Container, Header } from "@/shared/components/shared";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Checkout | Online Pizza",
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
