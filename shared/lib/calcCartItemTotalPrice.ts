import { CartItemDto } from "../services/dto/cartDto";

export const calcCartItemTotalPrice = (item: CartItemDto): number => {
    const ingredientsPrice = item.ingredients.reduce(
        (acc, ingredient) => acc + ingredient.price,
        0
    );

    return (ingredientsPrice + item.productItem.price) * item.quantity;
};
