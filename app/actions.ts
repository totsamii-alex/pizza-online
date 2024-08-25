"use server";

import { prisma } from "@/prisma/prismaClient";
import {
    PayOrderTemplate,
    VerificationUserTemplate,
} from "@/shared/components";
import { CheckoutFormValues } from "@/shared/constans";
import { createPayment, sendEmail } from "@/shared/lib";
import { getUserSession } from "@/shared/lib/getUserSession";
import { OrderStatus, Prisma } from "@prisma/client";
import { hashSync } from "bcrypt";
import { cookies } from "next/headers";

export async function createOrder(data: CheckoutFormValues) {
    try {
        const cookieStore = cookies();
        const cartToken = cookieStore.get("cartToken")?.value;

        if (!cartToken) {
            throw new Error("Cart token not found");
        }

        /* Finding a cart by token */
        const userCart = await prisma.cart.findFirst({
            where: {
                token: cartToken,
            },
            include: {
                user: true,
                items: {
                    include: {
                        ingredients: true,
                        productItem: {
                            include: {
                                product: true,
                            },
                        },
                    },
                },
            },
        });

        /* If the cart is not found, we return an error */
        if (!userCart) {
            throw new Error("Cart not found");
        }

        /* If the cart is empty we return an error */
        if (userCart?.totalAmount === 0) {
            throw new Error("Cart is empty");
        }

        /* Create an order */
        const order = await prisma.order.create({
            data: {
                token: cartToken,
                fullname: data.firstName + " " + data.lastName,
                email: data.email,
                phone: data.phone,
                address: data.address,
                comment: data.comment,
                totalAmount: userCart.totalAmount,
                status: OrderStatus.PENDING,
                items: JSON.stringify(userCart.items),
            },
        });

        const paymentData = await createPayment({
            amount: order.totalAmount,
            orderId: order.id,
            description: "Оплата заказа #" + order.id,
        });

        if (!paymentData) {
            throw new Error("Payment data not found");
        }

        // /* Emptying the Cart */
        await prisma.cart.update({
            where: {
                id: userCart.id,
            },
            data: {
                totalAmount: 0,
            },
        });

        await prisma.cartItem.deleteMany({
            where: {
                cartId: userCart.id,
            },
        });

        await prisma.order.update({
            where: {
                id: order.id,
            },
            data: {
                paymentId: paymentData.id,
            },
        });

        // Sending an email
        await sendEmail(
            data.email,
            "Online Pizza / Pay for order #" + order.id,
            PayOrderTemplate({
                orderId: order.id,
                totalAmount: order.totalAmount,
                paymentUrl: paymentData.url || "",
            })
        );

        return paymentData.url;
    } catch (err) {
        console.log("[CreateOrder] Server error", err);
    }
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
    try {
        const currentUser = await getUserSession();

        if (!currentUser) {
            throw new Error("User not found");
        }

        const findUser = await prisma.user.findFirst({
            where: {
                id: Number(currentUser.id),
            },
        });

        await prisma.user.update({
            where: {
                id: Number(currentUser.id),
            },
            data: {
                fullname: body.fullname,
                email: body.email,
                password: body.password
                    ? hashSync(body.password as string, 10)
                    : findUser?.password,
            },
        });
    } catch (err) {
        console.log("Error [UPDATE_USER]", err);
        throw err;
    }
}

export async function registerUser(body: Prisma.UserCreateInput) {
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: body.email,
            },
        });

        if (user) {
            if (!user.verified) {
                throw new Error("Email not confirmed");
            }

            throw new Error("User already exists");
        }

        const createdUser = await prisma.user.create({
            data: {
                fullname: body.fullname,
                email: body.email,
                password: hashSync(body.password, 10),
            },
        });

        const code = Math.floor(100000 + Math.random() * 900000).toString();

        await prisma.verificationCode.create({
            data: {
                code,
                userId: createdUser.id,
            },
        });

        await sendEmail(
            createdUser.email,
            "Next Pizza / 📝 Registration confirmation",
            VerificationUserTemplate({
                code,
            })
        );
    } catch (err) {
        console.log("Error [CREATE_USER]", err);
        throw err;
    }
}
