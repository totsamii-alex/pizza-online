"use client";

import React from "react";
import { cn } from "@/shared/lib/utils";
import * as CartItemDetails from "./cart-item-details";
import { CartItemProps } from "./cart-item-details/cartItemDetails.types";
import { Trash2Icon } from "lucide-react";

interface CheckoutItemProps extends CartItemProps {
    onClickCountButton?: (type: "plus" | "minus") => void;
    onClickRemove?: () => void;
    className?: string;
    isOrderHistory?: boolean;
}

export const CheckoutItem: React.FC<CheckoutItemProps> = ({
    name,
    price,
    imageUrl,
    quantity,
    details,
    className,
    disabled,
    isOrderHistory = false,
    onClickCountButton,
    onClickRemove,
}) => {
    return (
        <div
            className={cn(
                "flex items-center justify-between gap-5 sm:gap-14 lg:gap-20",
                {
                    "opacity-50 pointer-events-none": disabled,
                },
                className
            )}
        >
            <div className="flex items-center gap-3 sm:gap-5 flex-1 self-stretch lg:self-auto">
                <CartItemDetails.Image src={imageUrl} className="self-center" />
                <CartItemDetails.Info
                    name={name}
                    details={details}
                    className="self-center basis-full lg:basis-auto"
                />
            </div>

            {!isOrderHistory ? (
                <CartItemDetails.Price
                    value={price}
                    className="hidden sm:block"
                />
            ) : (
                <div className="flex flex-col items-right">
                    <CartItemDetails.Price value={price} />
                    <p className="text-gray-400">{quantity} pc.</p>
                </div>
            )}

            {!isOrderHistory && (
                <div className="flex flex-col sm:flex-row items-center gap-5 self-stretch justify-between">
                    <CartItemDetails.CountButton
                        onClick={onClickCountButton}
                        value={quantity}
                    />
                    <div className="flex justify-between self-stretch">
                        <CartItemDetails.Price
                            value={price}
                            className="block sm:hidden"
                        />

                        <button type="button" onClick={onClickRemove}>
                            <Trash2Icon
                                className="text-gray-400 cursor-pointer hover:text-gray-600"
                                size={20}
                            />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
