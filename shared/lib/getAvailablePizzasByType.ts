import { ProductItem } from "@prisma/client";
import { pizzaSizes, PizzaType } from "../constans/pizza";
import { Variant } from "../components/shared/groupVariants";

export const getAvailablePizzasByType = (
    type: PizzaType,
    items: ProductItem[]
): Variant[] => {
    const filteredPizzasByType = items.filter(
        (item) => item.pizzaType === type
    );

    return pizzaSizes.map((item) => ({
        name: item.name,
        value: item.value,
        disabled: !filteredPizzasByType.some(
            (pizza) => Number(pizza.size) === Number(item.value)
        ),
    }));
};
