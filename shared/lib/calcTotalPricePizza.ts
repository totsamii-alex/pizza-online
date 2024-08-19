import { Ingredient, ProductItem } from "@prisma/client";
import { PizzaSize, PizzaType } from "../constans/pizza";

/**
 * Function for calculating the total cost of a pizza.
 *
 * @example ```calcTotalPizzaPrice(1, 20, items, ingredients, selectedIngredients)```
 *
 * @param type - The type of dough for the selected pizza.
 * @param size - The size of the selected pizza.
 * @param items - The list of variations.
 * @param ingredients - The list of ingredients.
 * @param selectedIngredients - The selected ingredients.
 *
 * @returns number The total cost.
 */
export const calcTotalPricePizza = (
    type: PizzaType,
    size: PizzaSize,
    items: ProductItem[],
    ingredients: Ingredient[],
    selectedIngredients: Set<number>
) => {
    const pizzaPrice =
        items.find((item) => item.pizzaType === type && item.size === size)
            ?.price || 0;

    const totalIngredientsPrice = ingredients
        .filter((ingredient) => selectedIngredients.has(ingredient.id))
        .reduce((acc, ingredient) => acc + ingredient.price, 0);

    return pizzaPrice + totalIngredientsPrice;
};
