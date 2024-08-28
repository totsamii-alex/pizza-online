import { ChooseProductModal } from "@/shared/components/shared";
import { prisma } from "@/prisma/prismaClient";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Product | Online Pizza",
    };
}

export default async function ProductModalPage({
    params: { id },
}: {
    params: { id: string };
}) {
    const product = await prisma.product.findFirst({
        where: {
            id: Number(id),
        },
        include: {
            ingredients: true,
            items: true,
        },
    });

    if (!product) {
        return notFound();
    }

    return <ChooseProductModal product={product} />;
}
