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
            <Image
                src={imageUrl}
                alt="image-product"
                width={size === 20 ? 300 : size === 30 ? 400 : 500}
                height={size === 20 ? 300 : size === 30 ? 400 : 500}
                className={cn(
                    "relative left-2 top-2 hover:scale-105 transition-all duration-300 z-10",
                    className
                )}
                quality={100}
                unoptimized
            />

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-200 w-[450px] h-[450px]" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 rounded-full border-gray-100 w-[370px] h-[370px]" />
        </div>
    );
};
