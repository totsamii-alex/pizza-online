import { prisma } from "@/prisma/prismaClient";
import { authOptions } from "@/shared/constans/authOptions";
import { getServerSession } from "next-auth/next";
import { NextResponse, NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    try {
        const user = await getServerSession(authOptions);

        if (!user) {
            return NextResponse.json(
                { message: "You are not logged in" },
                { status: 401 }
            );
        }

        const data = await prisma.user.findUnique({
            where: {
                id: Number(user.user.id),
            },
            select: {
                fullname: true,
                email: true,
                password: false,
            },
        });

        return NextResponse.json(data);
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "[USER_GET] Server error" },
            { status: 500 }
        );
    }
}
