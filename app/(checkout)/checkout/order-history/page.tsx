import { prisma } from "@/prisma/prismaClient";
import { OrderList } from "@/shared/components";
import { getUserSession } from "@/shared/lib/getUserSession";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Order History | Online Pizza",
    };
}

export default async function ProfilePage() {
    const session = await getUserSession();

    if (!session) {
        return redirect("/not-auth");
    }

    const user = await prisma.user.findFirst({
        where: { id: Number(session?.id) },
    });

    if (!user) {
        return redirect("/not-auth");
    }

    const orders = await prisma.order.findMany({
        where: { email: user.email },
    });

    return <OrderList orders={orders} />;
}
