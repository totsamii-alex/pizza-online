"use client";

import React from "react";
import { cn } from "@/shared/lib/utils";
import { Ingredient, ProductItem } from "@prisma/client";
import { ProductImage } from "./productImage";
import { GroupVariants } from "./groupVariants";
import { IngredientItem } from "./ingredientItem";
import { Title } from "./title";
import { Button } from "../ui";
import {
    mapPizzaType,
    PizzaSize,
    PizzaType,
    pizzaTypes,
} from "@/shared/constans/pizza";
import { calcTotalPricePizza } from "@/shared/lib";
import { usePizzaOptions } from "@/shared/hooks";

interface ChoosePizzaFormProps {
    imageUrl: string;
    name: string;
    ingredients: Ingredient[];
    items: ProductItem[];
    loading?: boolean;
    onBack?: () => void;
    onSubmit: (itemId: number, ingredients: number[]) => void;
    className?: string;
}

export const ChoosePizzaForm: React.FC<ChoosePizzaFormProps> = ({
    imageUrl,
    name,
    ingredients,
    items,
    loading,
    onSubmit,
    onBack,
    className,
}) => {
    const {
        size,
        type,
        selectedIngredients,
        availableSizes,
        currentItemId,
        setSize,
        setType,
        addIngredient,
    } = usePizzaOptions(items);

    const totalPrice = calcTotalPricePizza(
        type,
        size,
        items,
        ingredients,
        selectedIngredients
    );

    const textDetails = `${size} cm, ${mapPizzaType[type]} dought, ${totalPrice} zł`;

    const handleSubmit = () => {
        if (currentItemId) {
            onSubmit(currentItemId, Array.from(selectedIngredients));
        }
    };

    return (
        <div className={cn("flex flex-1", className)}>
            <ProductImage imageUrl={imageUrl} size={size} />

            <div className="w-[490px] bg-[#F4F1EE] p-7">
                <Title text={name} size={"md"} className="font-bold mb-1" />

                <p className="text-gray-400">{textDetails}</p>

                <div className="flex flex-col gap-2 mt-4">
                    <GroupVariants
                        items={availableSizes}
                        value={String(size)}
                        onClick={(value) => setSize(Number(value) as PizzaSize)}
                    />
                    <GroupVariants
                        items={pizzaTypes}
                        value={String(type)}
                        onClick={(value) => setType(Number(value) as PizzaType)}
                    />
                </div>

                <div className="bg-gray-50 p-5 h-[420px] overflow-auto scrollbar mt-5">
                    <div className="grid grid-cols-3 gap-3">
                        {ingredients.map((ingredient) => (
                            <IngredientItem
                                key={ingredient.id}
                                {...ingredient}
                                onClick={() => addIngredient(ingredient.id)}
                                active={selectedIngredients.has(ingredient.id)}
                            />
                        ))}
                    </div>
                </div>

                <Button
                    loading={loading}
                    onClick={handleSubmit}
                    className="mt-10 w-full"
                    disabled={totalPrice === 0}
                >
                    {totalPrice
                        ? `Add to cart for ${totalPrice} zł`
                        : `Add to cart`}
                </Button>
            </div>
        </div>
    );
};
