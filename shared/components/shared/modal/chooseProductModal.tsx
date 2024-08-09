"use client";

import { Dialog } from "@/shared/components/ui";
import { DialogContent } from "@/shared/components/ui/dialog";
import React from "react";
import { cn } from "@/shared/lib/utils";
import { useRouter } from "next/navigation";
import { ChooseProductForm } from "../chooseProductForm";
import { ProductWithRelations } from "@/@types/prisma";
import { ChoosePizzaForm } from "../choosePizzaForm";
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
    const isPizzaForm = Boolean(product.items[0].pizzaType);

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

                    {isPizzaForm ? (
                        <ChoosePizzaForm
                            imageUrl={product.imageUrl}
                            name={product.name}
                            ingredients={product.ingredients}
                            items={product.items}
                        />
                    ) : (
                        <ChooseProductForm
                            imageUrl={product.imageUrl}
                            name={product.name}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};
