import React from "react";
import { getCartItemDetails } from "@/shared/lib";
import { CartStateItem } from "@/shared/lib/getCartDetails";
import { WhiteBlock } from "../whiteBlock";
import { CheckoutItemSkeleton } from "../checkoutItemSkeleton";
import { CheckoutItem } from "../checkoutItem";
import { PizzaSize, PizzaType } from "@/shared/constans/pizza";

interface CheckoutCartProps {
    items: CartStateItem[];
    onClickCountButton: (
        id: number,
        quantity: number,
        type: "plus" | "minus"
    ) => void;
    removeCartItem: (id: number) => void;
    loading?: boolean;
    className?: string;
}

export const CheckoutCart: React.FC<CheckoutCartProps> = ({
    items,
    onClickCountButton,
    removeCartItem,
    loading,
    className,
}) => {
    return (
        <WhiteBlock title="1. Cart" className={className}>
            <div className="flex flex-col gap-5">
                {loading
                    ? [...Array(items.length || 4)].map((_, index) => (
                          <CheckoutItemSkeleton key={index} />
                      ))
                    : items.map((item) => (
                          <CheckoutItem
                              key={item.id}
                              id={item.id}
                              imageUrl={item.imageUrl}
                              details={getCartItemDetails(
                                  item.ingredients,
                                  item.pizzaType as PizzaType,
                                  item.pizzaSize as PizzaSize
                              )}
                              name={item.name}
                              price={item.price}
                              quantity={item.quantity}
                              disabled={item.disabled}
                              onClickCountButton={(type) =>
                                  onClickCountButton(
                                      item.id,
                                      item.quantity,
                                      type
                                  )
                              }
                              onClickRemove={() => removeCartItem(item.id)}
                          />
                      ))}
            </div>
        </WhiteBlock>
    );
};
