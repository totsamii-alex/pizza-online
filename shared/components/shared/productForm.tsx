"use client";

import React from "react";
import toast from "react-hot-toast";
import { ProductWithRelations } from "@/@types/prisma";
import { useCartStore } from "@/shared/store";
import { ChoosePizzaForm } from "./choosePizzaForm";
import { ChooseProductForm } from "./chooseProductForm";

interface ProductFormProps {
    product: ProductWithRelations;
    onClick?: () => void;
    isPage?: boolean;
}

export const ProductForm: React.FC<ProductFormProps> = ({
    product,
    onClick,
    isPage = false,
}) => {
    const isPizzaForm = Boolean(product.items[0].pizzaType);

    const [addCartItem, loading] = useCartStore((state) => [
        state.addCartItem,
        state.loading,
    ]);

    const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
        try {
            const itemId = productItemId ?? product.items[0].id;

            await addCartItem({
                productItemId: itemId,
                ingredients: ingredients,
            });

            toast.success(product.name + " added to cart");
            onClick?.();
        } catch (error) {
            toast.error("Failed to add item to cart");
            console.error(error);
        }
    };

    return isPizzaForm ? (
        <ChoosePizzaForm
            imageUrl={product.imageUrl}
            name={product.name}
            ingredients={product.ingredients}
            items={product.items}
            description={product.description ? product.description : undefined}
            onSubmit={onSubmit}
            loading={loading}
            isPage={isPage}
        />
    ) : (
        <ChooseProductForm
            imageUrl={product.imageUrl}
            name={product.name}
            price={product.items[0].price}
            details={product.details ? product.details : undefined}
            description={product.description ? product.description : undefined}
            onSubmit={onSubmit}
            loading={loading}
            isPage={isPage}
        />
    );
};
