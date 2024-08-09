import React from "react";
import Image from "next/image";
import { cn } from "@/shared/lib/utils";
import { Title } from "./title";
import { Button } from "../ui";

interface ChooseProductFormProps {
    imageUrl: string;
    name: string;
    onSubmit?: (itemId: number, ingredients: number[]) => void;
    className?: string;
}

export const ChooseProductForm: React.FC<ChooseProductFormProps> = ({
    imageUrl,
    name,
    onSubmit,
    className,
}) => {
    const textDetails = "30 cm, traditional dought, 590 gr";
    const totalPrice = "300 zł";
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

                <p className="text-gray-400">{textDetails}</p>

                <Button className="mt-10 w-full">
                    Add to cart for {totalPrice}
                </Button>
            </div>
        </div>
    );
};
