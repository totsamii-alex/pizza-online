"use client";

import { ProductWithRelations } from "@/@types/prisma";
import { Dialog } from "@/shared/components/ui";
import { DialogContent } from "@/shared/components/ui/dialog";
import { cn } from "@/shared/lib/utils";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import React from "react";
import { ProductForm } from "../productForm";

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
                        "p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden",
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
