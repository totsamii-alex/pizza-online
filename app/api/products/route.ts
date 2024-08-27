import { prisma } from "@/prisma/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const categoryId = req.nextUrl.searchParams.get("categoryId");

    if (!categoryId) {
        return NextResponse.json(
            { message: "[categoryId] is required" },
            { status: 400 }
        );
    }

    const products = await prisma.product.findMany({
        where: {
            category: {
                id: Number(categoryId),
            },
        },
        include: {
            ingredients: true,
            items: true,
        },
        take: 6,
    });

    if (products.length === 0) {
        return NextResponse.json(
            { message: "[Products] not found" },
            { status: 404 }
        );
    }

    return NextResponse.json(products);
}
