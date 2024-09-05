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
                toast.success("Email successfully verified!", {
                    duration: 3000,
                });
            }, 1000);
        }
    }, []);

    return (
        <header className={cn("border-b", className)}>
            <Container className="flex items-center justify-between p-3 sm:py-6 lg:py-8 flex-wrap sm:flex-nowrap gap-y-4 sm:gap-y-0">
                {/* Left side */}
                <Link href="/main" className="order-1">
                    <div className="flex items-center gap-2 sm:gap-4">
                        <Image
                            src="/logo.png"
                            alt="Logo"
                            width={35}
                            height={35}
                        />
                        <div>
                            <h1 className="text-sm sm:text-2xl uppercase font-black w-12 sm:w-auto">
                                Online Pizza
                            </h1>
                            <p className="text-sm text-gray-400 leading-3 hidden sm:block">
                                as good as it gets
                            </p>
                        </div>
                    </div>
                </Link>

                {hasSearch && (
                    <div className="mx-0 flex-1 sm:mx-5 md:mx-10 order-3 sm:order-2 basis-full sm:basis-auto">
                        <SearchInput />
                    </div>
                )}

                {/* Right side */}
                <div className="flex items-center gap-[5px] sm:gap-3 order-2 sm:order-3">
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
