import React from "react";
import Image from "next/image";
import { cn } from "@/shared/lib/utils";
import { Title } from "./title";
import { Button } from "../ui";

interface ChooseProductFormProps {
    imageUrl: string;
    name: string;
    price: number;
    details?: string;
    description?: string;
    loading?: boolean;
    onSubmit: () => void;
    isPage?: boolean;
    className?: string;
}

export const ChooseProductForm: React.FC<ChooseProductFormProps> = ({
    imageUrl,
    name,
    price,
    details,
    description,
    loading,
    isPage,
    className,
    onSubmit,
}) => {
    return (
        <div
            className={cn(
                "flex flex-1 flex-col xl:flex-row",
                { "gap-12": isPage },
                className
            )}
        >
            <div
                className={cn(
                    "flex items-center justify-center flex-1 relative w-full self-center",
                    { "bg-secondary rounded-2xl": isPage },
                    className
                )}
            >
                <Image
                    src={imageUrl}
                    alt="image-product"
                    width={350}
                    height={350}
                    className={cn(
                        "relative left-2 top-2 hover:scale-105 transition-all duration-300 z-10",
                        className
                    )}
                    quality={100}
                    unoptimized
                />
            </div>

            <div
                className={cn(
                    "w-full xl:w-[50%] h-auto xl:h-full flex flex-col justify-between bg-[#f6f6f6] p-4 sm:p-7",
                    { "h-auto rounded-2xl p-0 bg-white": isPage }
                )}
            >
                <div className="flex flex-col gap-3 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#f6f6f6] pointer-events-none"></div>

                    <Title
                        text={name}
                        size={"md"}
                        className="font-bold mb-1 relative z-10"
                    />

                    <div className="relative flex items-center z-10">
                        <p className="text-xl">{details}</p>
                        <div className="flex-1 h-px bg-gray-600 mx-4"></div>
                        <span
                            className={cn(
                                "text-xs text-gray-400 uppercase tracking-widest",
                                { "mr-3": isPage }
                            )}
                        >
                            Details
                        </span>
                    </div>

                    <p className="text-gray-400 relative z-10">{description}</p>

                    <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-yellow-300 to-transparent rounded-full opacity-30 pointer-events-none"></div>
                    <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-br from-green-300 to-transparent rounded-full opacity-30 pointer-events-none"></div>
                </div>

                <Button
                    loading={loading}
                    onClick={() => onSubmit()}
                    className="relative overflow-hidden mt-10 w-full"
                >
                    Add to cart for {price} zł
                    <div className="flare"></div>
                </Button>
            </div>
        </div>
    );
};
