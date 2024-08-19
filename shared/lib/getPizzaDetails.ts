import { Ingredient, ProductItem } from "@prisma/client";
import { calcTotalPricePizza } from "../lib";
import { mapPizzaType, PizzaSize, PizzaType } from "../constans/pizza";

interface ReturnProps {
    totalPrice: number;
    textDetails: string;
}

export const getPizzaDetails = (
    type: PizzaType,
    size: PizzaSize,
    items: ProductItem[],
    ingredients: Ingredient[],
    selectedIngredients: Set<number>
): ReturnProps => {
    const totalPrice = calcTotalPricePizza(
        type,
        size,
        items,
        ingredients,
        selectedIngredients
    );

    const textDetails = `${size} cm, ${mapPizzaType[type]} dought, ${totalPrice} zł`;

    return {
        totalPrice,
        textDetails,
    };
};
