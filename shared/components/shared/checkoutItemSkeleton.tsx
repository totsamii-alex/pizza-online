import { cn } from "@/shared/lib/utils";
import React from "react";

interface CheckoutItemSkeletonProps {
    className?: string;
}

export const CheckoutItemSkeleton: React.FC<CheckoutItemSkeletonProps> = ({
    className,
}) => {
    return (
        <div className={cn("flex items-center justify-between", className)}>
            <div className="flex items-center gap-5">
                <div className="w-[60px] h-[60px] bg-gray-200 rounded-full animate-pulse" />
                <h2 className="w-40 h-5 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="h-5 w-10 bg-gray-200 rounded animate-pulse" />
            <div className="h-8 w-[133px] bg-gray-200 rounded animate-pulse" />
        </div>
    );
};
