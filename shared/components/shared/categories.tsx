"use client";

import React from "react";
import { cn } from "@/shared/lib/utils";
import { Category } from "@prisma/client";
import { useCategoryStore } from "@/shared/store/category";

interface CategoriesProps {
    items: Category[];
    className?: string;
}

export const Categories: React.FC<CategoriesProps> = ({ items, className }) => {
    const activeCategoryId = useCategoryStore((state) => state.activeId);

    return (
        <div
            className={cn(
                "inline-flex gap-1 p-1 bg-gray-50 rounded-2xl",
                className
            )}
        >
            {items.map(({ name, id }) => (
                <a
                    className={cn(
                        "flex items-center font-bold h-11 rounded-2xl px-5 hover:bg-white hover:shadow-md hover:shadow-gray-200",
                        activeCategoryId === id &&
                            "bg-white shadow-md shadow-gray-200 text-primary"
                    )}
                    href={`#${name}`}
                    key={id}
                >
                    <button>{name}</button>
                </a>
            ))}
        </div>
    );
};
