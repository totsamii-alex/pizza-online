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
    description?: string;
    loading?: boolean;
    onBack?: () => void;
    onSubmit: (itemId: number, ingredients: number[]) => void;
    isPage?: boolean;
    className?: string;
}

export const ChoosePizzaForm: React.FC<ChoosePizzaFormProps> = ({
    imageUrl,
    name,
    ingredients,
    items,
    description,
    loading,
    onSubmit,
    onBack,
    isPage,
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
        <div
            className={cn("flex flex-1 flex-col xl:flex-row", {
                "gap-12": isPage,
            })}
        >
            <ProductImage
                className={cn(
                    " w-full h-[400px] shrink-0 basis-auto self-center xl:w-auto xl:h-auto",
                    { "bg-secondary rounded-2xl": isPage }
                )}
                imageUrl={imageUrl}
                size={size}
            />

            <div
                className={cn("w-full xl:w-[50%] bg-[#F4F1EE] p-4 sm:p-7", {
                    "bg-white p-0": isPage,
                })}
            >
                <Title text={name} size={"md"} className="font-bold mb-1" />

                <p className="text-xl">{textDetails}</p>

                {description && <p className="text-gray-400">{description}</p>}

                <div
                    className={cn("flex flex-col gap-2 mt-4", {
                        "gap-5": isPage,
                    })}
                >
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

                <Title
                    text="Additional Ingredients"
                    size={"sm"}
                    className="font-bold mt-7"
                />

                <div
                    className={cn(
                        "bg-gray-50 p-5 h-[420px] overflow-auto scrollbar mt-5",
                        {
                            "bg-white h-[200px]": isPage,
                        }
                    )}
                >
                    <div
                        className={cn(
                            "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 justify-center gap-4",
                            {
                                "bg-white grid-cols-4": isPage,
                            }
                        )}
                    >
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
                    className="relative overflow-hidden w-full mt-10"
                    disabled={totalPrice === 0}
                >
                    {totalPrice
                        ? `Add to cart for ${totalPrice} zł`
                        : `Add to cart`}

                    <div className="flare"></div>
                </Button>
            </div>
        </div>
    );
};
