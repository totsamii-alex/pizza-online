"use client";

import React, { useEffect } from "react";
import { useIntersection } from "react-use";
import { Title } from "./title";
import { cn } from "@/shared/lib/utils";
import { ProductCard } from "./productCard";
import { useCategoryStore } from "../../store/category";
import { ProductWithRelations } from "@/@types/prisma";

interface ProductsGroupListProps {
    title: string;
    items: ProductWithRelations[];
    listClassName?: string;
    categoryId?: number;
    className?: string;
}

export const ProductsGroupList: React.FC<ProductsGroupListProps> = ({
    className,
    title,
    items,
    listClassName,
    categoryId,
}) => {
    const intersectionRef = React.useRef(null);

    const intersection = useIntersection(intersectionRef, {
        threshold: items.length > 10 ? 0.1 : 0.4,
    });
    const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);

    useEffect(() => {
        if (intersection?.isIntersecting && categoryId) {
            setActiveCategoryId(categoryId);
        }
    }, [intersection, categoryId, setActiveCategoryId]);

    return (
        <div className={className} ref={intersectionRef} id={title}>
            <Title text={title} size="lg" className="font-extrabold mb-5" />

            <div className={cn("grid grid-cols-3 gap-12", listClassName)}>
                {items.map((item) => (
                    <ProductCard
                        imageUrl={item.imageUrl}
                        id={item.id}
                        key={item.id}
                        name={item.name}
                        price={item.items[0].price}
                        details={item.details || undefined}
                        description={item.description || undefined}
                        ingredients={
                            item.ingredients.length > 0
                                ? item.ingredients
                                : undefined
                        }
                    />
                ))}
            </div>
        </div>
    );
};
