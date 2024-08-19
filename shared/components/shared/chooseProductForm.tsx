import React from "react";
import Image from "next/image";
import { cn } from "@/shared/lib/utils";
import { Title } from "./title";
import { Button } from "../ui";

interface ChooseProductFormProps {
    imageUrl: string;
    name: string;
    price: number;
    loading?: boolean;
    onSubmit: () => void;
    className?: string;
}

export const ChooseProductForm: React.FC<ChooseProductFormProps> = ({
    imageUrl,
    name,
    price,
    loading,
    className,
    onSubmit,
}) => {
    return (
        <div className={cn("flex flex-1", className)}>
            <div
                className={cn(
                    "flex items-center justify-center flex-1 relative w-full",
                    className
                )}
            >
                <Image
                    src={imageUrl}
                    alt="image-product"
                    width={350}
                    height={350}
                    className={cn(
                        "relative left-2 top-2 transition-all duration-300 z-10",
                        className
                    )}
                    quality={100}
                    unoptimized
                />
            </div>

            <div className="w-[490px] bg-[#f6f6f6] p-7">
                <Title text={name} size={"md"} className="font-bold mb-1" />

                <Button
                    loading={loading}
                    onClick={() => onSubmit()}
                    className="mt-10 w-full"
                >
                    Add to cart for {price} zł
                </Button>
            </div>
        </div>
    );
};
