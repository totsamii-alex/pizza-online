import React from "react";
import { getCartItemDetails } from "@/shared/lib";
import { CartStateItem } from "@/shared/lib/getCartDetails";
import { WhiteBlock } from "../whiteBlock";
import { CheckoutItemSkeleton } from "../checkoutItemSkeleton";
import { CheckoutItem } from "../checkoutItem";
import { PizzaSize, PizzaType } from "@/shared/constans/pizza";
import Image from "next/image";
import { Title } from "../title";
import { Button } from "../../ui";
import { ArrowLeft } from "lucide-react";

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
                {false ? (
                    [...Array(items.length || 4)].map((_, index) => (
                        <CheckoutItemSkeleton key={index} />
                    ))
                ) : items.length > 0 ? (
                    items.map((item) => (
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
                                onClickCountButton(item.id, item.quantity, type)
                            }
                            onClickRemove={() => removeCartItem(item.id)}
                        />
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center w-72 mx-auto">
                        <Image
                            src="/assets/images/empty-box.png"
                            alt="Empty cart"
                            width={120}
                            height={120}
                        />
                        <Title
                            size="sm"
                            text="Cart is empty"
                            className="text-center font-bold my-2"
                        />
                        <p className="text-center text-neutral-500 mb-5">
                            Add at least one pizza to complete your order
                        </p>

                        <Button
                            className="w-56 h-12 text-base"
                            size="lg"
                            type="button"
                            onClick={() => (window.location.href = "/main")}
                        >
                            <ArrowLeft className="w-5 mr-2" />
                            Go back to Home
                        </Button>
                    </div>
                )}
            </div>
        </WhiteBlock>
    );
};
