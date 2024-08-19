import { prisma } from "@/prisma/prismaClient";
import { NextRequest, NextResponse } from "next/server";
import { findOrCreateCart, updateCartTotalAmount } from "@/shared/lib";
import crypto from "crypto";
import { CreateCartItemValues } from "@/shared/services/dto/cartDto";

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get("cartToken")?.value;

        if (!token) {
            return NextResponse.json({ totalAmount: 0, items: [] });
        }

        const userCart = await prisma.cart.findFirst({
            where: {
                OR: [
                    {
                        token,
                    },
                ],
            },
            include: {
                items: {
                    orderBy: {
                        createdAt: "desc",
                    },
                    include: {
                        productItem: {
                            include: {
                                product: true,
                            },
                        },
                        ingredients: true,
                    },
                },
            },
        });

        return NextResponse.json(userCart);
    } catch (error) {
        console.log("[CART_GET] Server error", error);
        return NextResponse.json(
            { message: "Failed to get cart" },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        let token = req.cookies.get("cartToken")?.value;

        if (!token) {
            token = crypto.randomUUID();
        }

        const userCart = await findOrCreateCart(token);

        const data = (await req.json()) as CreateCartItemValues;

        const findCartItems = await prisma.cartItem.findMany({
            where: {
                cartId: userCart.id,
                productItemId: data.productItemId,
            },
            include: {
                ingredients: true,
            },
        });

        const cartItem = findCartItems.find(
            ({ ingredients }) =>
                ingredients.length === data.ingredients?.length &&
                ingredients.every(({ id }) => data.ingredients?.includes(id))
        );

        // If the product is found, +1
        if (cartItem) {
            await prisma.cartItem.update({
                where: {
                    id: cartItem.id,
                },
                data: {
                    quantity: cartItem.quantity + 1,
                },
            });
        } else {
            await prisma.cartItem.create({
                data: {
                    cartId: userCart.id,
                    productItemId: data.productItemId,
                    quantity: 1,
                    ingredients: {
                        connect: data.ingredients?.map((id) => ({ id })),
                    },
                },
            });
        }

        const updatedUserCart = await updateCartTotalAmount(token);

        const resp = NextResponse.json(updatedUserCart);
        resp.cookies.set("cartToken", token, { maxAge: 60 * 60 * 24 * 7 });
        return resp;
    } catch (error) {
        console.log("[CART_POST] Server error", error);
        return NextResponse.json(
            { message: "Failed to create cart" },
            { status: 500 }
        );
    }
}
