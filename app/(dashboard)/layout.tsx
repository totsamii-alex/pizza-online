import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Online Pizza | Dashboard",
    description:
        "Manage your online pizza orders and view important metrics in your Dashboard.",
    openGraph: {
        title: "Online Pizza | Dashboard",
        description:
            "Manage your online pizza orders and view important metrics in your Dashboard.",
        url: "https://pizza-online-rho.vercel.app/dashboard",
        type: "website",
        images: [
            {
                url: "",
                width: 1200,
                height: 630,
                alt: "Online Pizza Dashboard",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Online Pizza | Dashboard",
        description:
            "Manage your online pizza orders and view important metrics in your Dashboard.",
        images: "https://pizza-online-rho.vercel.app/logo.png",
        site: "@yourtwitterhandle",
    },
};

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <main className="min-h-screen">{children}</main>;
}
