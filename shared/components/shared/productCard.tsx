import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Title } from "./title";
import { Button } from "../ui";
import { Plus } from "lucide-react";
import { Ingredient } from "@prisma/client";
import { cn } from "@/shared/lib/utils";

interface ProductCardProps {
    id: number;
    price: number;
    name: string;
    imageUrl: string;
    details?: string;
    description?: string;
    ingredients?: Ingredient[];
    className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
    imageUrl,
    id,
    name,
    price,
    details,
    description,
    ingredients,
    className,
}) => {
    return (
        <div className={cn("flex flex-col justify-between", className)}>
            <div className="flex flex-col">
                <Link href={`/product/${id}`} scroll={false}>
                    <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px] hover:scale-105 transition-all duration-300">
                        <Image
                            src={imageUrl}
                            alt={name}
                            width={215}
                            height={215}
                        />
                    </div>
                </Link>

                <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />

                {ingredients && (
                    <p className="text-sm text-gray-400">
                        {ingredients
                            ?.map((ingrdient) => ingrdient.name)
                            .join(", ")}
                    </p>
                )}

                {!ingredients && (
                    <p className="text-sm text-gray-400">{description}</p>
                )}
            </div>

            <div className="flex justify-between items-center mt-4">
                <span className="text-[20px]">
                    from <b>{price} zł</b>
                </span>

                <Link href={`/product/${id}`} scroll={false}>
                    <Button
                        variant={"secondary"}
                        className="flex items-center gap-1"
                        size={"sm"}
                    >
                        <Plus size={16} />
                        <b className="text-primary">Add to cart</b>
                    </Button>
                </Link>
            </div>
        </div>
    );
};
