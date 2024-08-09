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
    pizzaSizes,
    PizzaType,
    pizzaTypes,
} from "@/shared/constans/pizza";
import { useSet } from "react-use";

interface ChoosePizzaFormProps {
    imageUrl: string;
    name: string;
    ingredients: Ingredient[];
    items?: ProductItem[];
    loading?: boolean;
    onSubmit?: (itemId: number, ingredients: number[]) => void;
    className?: string;
}

export const ChoosePizzaForm: React.FC<ChoosePizzaFormProps> = ({
    imageUrl,
    name,
    ingredients,
    items,
    loading,
    onSubmit,
    className,
}) => {
    const [size, setSize] = React.useState<PizzaSize>(20);
    const [type, setType] = React.useState<PizzaType>(1);

    const [selectedIngredients, { toggle: setSelectedIngredients }] = useSet(
        new Set<number>([])
    );

    const pizzaPrice =
        items?.find((item) => item.pizzaType === type && item.size === size)
            ?.price || 0;
    const totalPriceSelectedIngredients = ingredients
        .filter((ingredient) => selectedIngredients.has(ingredient.id))
        .reduce((acc, ingredient) => acc + ingredient.price, 0);
    const totalPrice = pizzaPrice + totalPriceSelectedIngredients;

    const textDetails = `${size} cm, ${mapPizzaType[type]} dought, ${totalPrice} zł`;

    const handleSubmit = () => {
        console.log({
            size,
            type,
            ingredients: selectedIngredients,
        });
    };

    return (
        <div className={cn("flex flex-1", className)}>
            <ProductImage imageUrl={imageUrl} size={size} />

            <div className="w-[490px] bg-[#F4F1EE] p-7">
                <Title text={name} size={"md"} className="font-bold mb-1" />

                <p className="text-gray-400">{textDetails}</p>

                <div className="flex flex-col gap-2 mt-4">
                    <GroupVariants
                        items={pizzaSizes}
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
                                onClick={() =>
                                    setSelectedIngredients(ingredient.id)
                                }
                                active={selectedIngredients.has(ingredient.id)}
                            />
                        ))}
                    </div>
                </div>

                <Button onClick={handleSubmit} className="mt-10 w-full">
                    Add to cart for {totalPrice}zł
                </Button>
            </div>
        </div>
    );
};
