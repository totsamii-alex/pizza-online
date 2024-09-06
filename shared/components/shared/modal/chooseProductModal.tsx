"use client";

import { ProductWithRelations } from "@/@types/prisma";
import { cn } from "@/shared/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";
import { ProductForm } from "../productForm";

import { Dialog } from "@/shared/components/ui";
import { DialogContent } from "@/shared/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

interface ChooseProductModalProps {
    product: ProductWithRelations;
    className?: string;
}

export const ChooseProductModal: React.FC<ChooseProductModalProps> = ({
    product,
    className,
}) => {
    const router = useRouter();
    return (
        <div className={className}>
            <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
                <DialogContent
                    className={cn(
                        "w-[90%] h-[95%] rounded-md border-black border-[1px] overflow-y-auto p-0 xl:w-[1060px] xl:max-w-[1060px] xl:max-h-[820px] bg-white",
                        { "h-min": !Boolean(product.items[0].pizzaType) },
                        className
                    )}
                >
                    <DialogTitle className="hidden" />

                    <ProductForm
                        product={product}
                        onClick={() => router.back()}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
};
