import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Title } from "./title";
import { Button } from "../ui";
import { Plus } from "lucide-react";

interface ProductCardProps {
    id: number;
    price: number;
    name: string;
    className?: string;
    imageUrl: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
    className,
    imageUrl,
    id,
    name,
    price,
}) => {
    return (
        <div className={className}>
            <Link href={`/product/${id}`} scroll={false}>
                <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
                    <Image src={imageUrl} alt={name} width={215} height={215} />
                </div>
            </Link>

            <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />

            <p className="text-sm text-gray-400">
                Цыпленок, моцарелла, сыры чеддер и пармезан, сырный соус,
                томаты, соус альфредо, чеснок
            </p>

            <div className="flex justify-between items-center mt-4">
                <span className="text-[20px]">
                    from <b>{price} zł</b>
                </span>

                <Button
                    variant={"secondary"}
                    className="flex items-center gap-1"
                    size={"sm"}
                >
                    <Plus size={16} />
                    <b className="text-primary">Add to cart</b>
                </Button>
            </div>
        </div>
    );
};
