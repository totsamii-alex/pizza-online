import { Nunito } from "next/font/google";
import "./globals.css";
import { Providers } from "@/shared/components/shared/providers";
import { Metadata, Viewport } from "next";

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

export const metadata: Metadata = {
    title: "Main Page | Online Pizza",
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
        url: "https://pizza-online-rho.vercel.app/open-image.png",
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
        icon: "https://pizza-online-rho.vercel.app/logo.png",
        shortcut: "https://pizza-online-rho.vercel.app/logo.png",
        apple: "https://pizza-online-rho.vercel.app/logo.png",
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
