import { cn } from "@/shared/lib/utils";
import React from "react";
import { Categories, Container, SortPopup } from ".";
import { Category } from "@prisma/client";

interface TopBarProps {
    categories: Category[];
    className?: string;
}

export const TopBar: React.FC<TopBarProps> = ({ categories, className }) => {
    return (
        <div
            className={cn(
                "sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10",
                className
            )}
        >
            <Container className="flex justify-between items-center">
                <Categories items={categories} />
                <SortPopup />
            </Container>
        </div>
    );
};
