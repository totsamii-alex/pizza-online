"use client";

import { cn } from "@/shared/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CartButton } from "./cartButton";
import { Container } from "./container";
import { ProfileButton } from "./profileButton";
import { SearchInput } from "./searchInput";
import { AuthModal } from "./modal";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

interface HeaderProps {
    hasSearch?: boolean;
    hasCart?: boolean;
    className?: string;
}

export const Header: React.FC<HeaderProps> = ({
    hasSearch = true,
    hasCart = true,
    className,
}) => {
    const router = useRouter();
    const [openAuthModal, setOpenAuthModal] = React.useState(false);

    const searchParams = useSearchParams();

    React.useEffect(() => {
        if (searchParams.has("verified")) {
            setTimeout(() => {
                router.replace("/main");
                toast.success("Почта успешно подтверждена!", {
                    duration: 3000,
                });
            }, 1000);
        }
    }, []);

    return (
        <header className={cn("border-b", className)}>
            <Container className="flex items-center justify-between py-8">
                {/* Left side */}
                <Link href="/main">
                    <div className="flex items-center gap-4">
                        <Image
                            src="/logo.png"
                            alt="Logo"
                            width={35}
                            height={35}
                        />
                        <div>
                            <h1 className="text-2xl uppercase font-black">
                                Online Pizza
                            </h1>
                            <p className="text-sm text-gray-400 leading-3">
                                as good as it gets
                            </p>
                        </div>
                    </div>
                </Link>

                {hasSearch && (
                    <div className="mx-10 flex-1">
                        <SearchInput />
                    </div>
                )}

                {/* Right side */}
                <div className="flex items-center gap-3">
                    <AuthModal
                        open={openAuthModal}
                        onClose={() => setOpenAuthModal(false)}
                    />

                    <ProfileButton
                        onClickSignIn={() => setOpenAuthModal(true)}
                    />

                    {hasCart && <CartButton />}
                </div>
            </Container>
        </header>
    );
};
