import type { Metadata } from "next";
import { Header } from "@/shared/components/shared";
import { Footer } from "@/shared/components/shared";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Main Page | Online Pizza",
};

export default function MainLayout({
    children,
    modal,
}: Readonly<{
    children: React.ReactNode;
    modal: React.ReactNode;
}>) {
    return (
        <main className="min-h-screen">
            <Suspense>
                <Header />
            </Suspense>

            {children}
            {modal}

            <Footer />
        </main>
    );
}
