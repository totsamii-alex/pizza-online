import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Online Pizza | Dashboard",
    description:
        "Manage your online pizza orders and view important metrics in your Dashboard.",
};

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <main className="min-h-screen">{children}</main>;
}
