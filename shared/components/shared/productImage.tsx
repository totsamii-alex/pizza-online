import { cn } from "@/shared/lib/utils";
import Image from "next/image";
import React from "react";

interface ProductImageProps {
    imageUrl: string;
    alt?: string;
    size: 20 | 30 | 40;
    className?: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({
    className,
    imageUrl,
    size,
}) => {
    return (
        <div
            className={cn(
                "flex items-center justify-center flex-1 relative w-full",
                className
            )}
        >
            <img
                src={imageUrl}
                alt="image-product"
                className={cn(
                    "relative left-2 top-2 transition-all duration-300 z-10 hover:scale-105",
                    {
                        "w-[205px] xl:w-[300px] h-[205px] xl:h-[300px]":
                            size === 20,
                    },
                    {
                        "w-[265px] xl:w-[400px] h-[265px] xl:h-[400px]":
                            size === 30,
                    },
                    {
                        "w-[325px] xl:w-[500px] h-[325px] xl:h-[500px]":
                            size === 40,
                    }
                )}
            />

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-100 w-[240px] h-[240px] xl:w-[450px] xl:h-[450px]" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 rounded-full border-gray-100 w-[300px] h-[300px] xl:w-[370px] xl:h-[370px]" />
        </div>
    );
};
