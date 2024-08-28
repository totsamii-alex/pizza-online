import { Nunito } from "next/font/google";
import "./globals.css";
import { Providers } from "@/shared/components/shared/providers";
import { Viewport } from "next";

const nunito = Nunito({
    subsets: ["cyrillic"],
    variable: "--font-nunito",
    weight: ["400", "500", "600", "700", "800", "900"],
});

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
};

export const metadata = {
    title: "Online Pizza | Main Page",
    description:
        "Welcome to Online Pizza, the best place to order your favorite pizzas online! Explore our menu and get your pizza delivered fresh to your doorstep.",
    icons: {
        icon: "/logo.png",
    },
    authors: [
        {
            name: "Olekii Rybka",
            url: "www.linkedin.com/in/oleksii-rybka-aa713b313",
        },
    ],
    openGraph: {
        type: "website",
        url: "https://pizza-online-rho.vercel.app/",
        title: "Online Pizza | Main Page",
        description:
            "Welcome to Online Pizza, the best place to order your favorite pizzas online! Explore our menu and get your pizza delivered fresh to your doorstep.",
        images: [
            {
                url: "https://pizza-online-rho.vercel.app/open-image.png",
                width: 1200,
                height: 630,
                alt: "Screenshot Main Page of Online Pizza",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Online Pizza | Main Page",
        description:
            "Welcome to Online Pizza, the best place to order your favorite pizzas online! Explore our menu and get your pizza delivered fresh to your doorstep.",
        images: ["https://pizza-online-rho.vercel.app/open-image.png"],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={nunito.className}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
