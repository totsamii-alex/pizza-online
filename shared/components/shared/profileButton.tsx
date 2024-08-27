"use client";

import { CircleUser, User } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui";
import { cn } from "@/shared/lib/utils";

interface ProfileButtonProps {
    onClickSignIn?: () => void;
    className?: string;
}

export const ProfileButton: React.FC<ProfileButtonProps> = ({
    onClickSignIn,
    className,
}) => {
    const { data: session, status } = useSession();

    return (
        <div className={className}>
            {!session ? (
                <Button
                    loading={status === "loading" ? true : false}
                    variant="outline"
                    className={cn("flex items-center gap-1 w-15", {
                        "w-[85px]": status === "loading",
                    })}
                    onClick={onClickSignIn}
                >
                    <User size={16} />
                    Login
                </Button>
            ) : (
                <Link href="/profile">
                    <Button
                        variant="secondary"
                        className="flex items-center gap-2 border border-primary"
                    >
                        <CircleUser size={18} />
                        Profile
                    </Button>
                </Link>
            )}
        </div>
    );
};
