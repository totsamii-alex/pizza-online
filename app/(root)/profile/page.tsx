import { prisma } from "@/prisma/prismaClient";
import { ProfileForm } from "@/shared/components";
import { getUserSession } from "@/shared/lib/getUserSession";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Profile | Online Pizza",
};

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

    return <ProfileForm data={user} />;
}
