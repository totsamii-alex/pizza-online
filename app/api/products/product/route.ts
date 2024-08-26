import { prisma } from "@/prisma/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const id = req.nextUrl.searchParams.get("productId");

    if (!id) {
        return NextResponse.json(
            { message: "[ID] is required" },
            { status: 400 }
        );
    }

    const product = await prisma.product.findFirst({
        where: { id: Number(id) },
        include: {
            ingredients: true,
            category: true,
            items: true,
        },
    });

    if (!product) {
        return NextResponse.json(
            { message: "[Product] not found" },
            { status: 400 }
        );
    }

    return NextResponse.json(product);
}
