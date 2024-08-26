import type { Metadata } from "next";
import { Header } from "@/shared/components/shared";
import { Footer } from "@/shared/components/shared";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Online Pizza | Main Page",
    description:
        "Welcome to Online Pizza, the best place to order your favorite pizzas online! Explore our menu and get your pizza delivered fresh to your doorstep.",
    keywords: [
        "pizza",
        "online pizza",
        "order pizza",
        "pizza delivery",
        "best pizza",
    ],
    authors: [
        {
            name: "Olekii Rybka",
            url: "www.linkedin.com/in/oleksii-rybka-aa713b313",
        },
    ],
    openGraph: {
        title: "Online Pizza | Main Page",
        description:
            "Order your favorite pizzas online from Online Pizza. Fresh ingredients, fast delivery, and great taste!",
        url: "https://pizza-online-rho.vercel.app/",
        type: "website",
        images: [
            {
                url: "",
                width: 1200,
                height: 630,
                alt: "Online Pizza",
            },
        ],
    },
    icons: {
        icon: "/logo.png",
        shortcut: "/logo.png",
        apple: "/logo.png",
    },
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
