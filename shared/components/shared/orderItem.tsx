"use client";

import { ICartStateItem } from "@/@types/prisma";
import { PizzaSize, PizzaType } from "@/shared/constans";
import { getCartItemDetails } from "@/shared/lib";
import { cn } from "@/shared/lib/utils";
import { Order } from "@prisma/client";
import { ChevronUp } from "lucide-react";
import React, { useState } from "react";
import { CheckoutItem } from "./checkoutItem";
import { Title } from "./title";

interface OrderItemProps {
    order: Order;
    className?: string;
}

export const OrderItem: React.FC<OrderItemProps> = ({ order, className }) => {
    const [isOpen, setIsOpen] = useState(false);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);

        const options: Intl.DateTimeFormatOptions = {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        };

        return new Intl.DateTimeFormat("en-EN", options).format(date);
    };

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    const items: [] = JSON.parse(order.items as string);
    return (
        <div className="flex flex-col w-full lg:w-[70%] py-5 px-[15px] sm:px-8 bg-white rounded-3xl">
            <div
                className="flex items-stretch justify-between sm:items-center cursor-pointer"
                onClick={toggleOpen}
            >
                <div className="flex flex-col items-start justify-between sm:flex-row gap-2 sm:items-center sm:gap-8">
                    <Title
                        text={"Order #" + order.id}
                        className="font-bold text-[18px] sm:text-[26px]"
                    />

                    <span className="text-[12px] sm:text-[16px]">
                        {formatDate(order.createdAt.toString())}
                    </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-8">
                    <p
                        className={cn(
                            "py-2 px-4 rounded-2xl text-[12px] sm:text-[16px]",
                            {
                                "bg-green-200 text-green-600":
                                    order.status === "SUCCEEDED",
                            },
                            {
                                "bg-yellow-200 text-yellow-600":
                                    order.status === "PENDING",
                            },
                            {
                                "bg-red-200 text-red-600":
                                    order.status === "CANCELLED",
                            },
                            {
                                "bg-gray-200 text-gray-600":
                                    order.status === "EXPIRED",
                            }
                        )}
                    >
                        {order.status.toLowerCase()}
                    </p>
                    <ChevronUp
                        className={
                            isOpen
                                ? "rotate-180 transition-all duration-200"
                                : ""
                        }
                    />
                </div>
            </div>

            <div
                className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                )}
            >
                <div className="flex flex-col gap-5 my-5 px-0 sm:p-5 border-t border-b border-gray-300">
                    {JSON.parse(order.items as string).map(
                        (item: ICartStateItem) => (
                            <CheckoutItem
                                key={item.id}
                                id={item.id}
                                imageUrl={item.productItem.product.imageUrl}
                                details={getCartItemDetails(
                                    item.ingredients,
                                    item.productItem.pizzaType as PizzaType,
                                    item.productItem.size as PizzaSize
                                )}
                                name={item.productItem.product.name}
                                price={item.productItem.price}
                                quantity={item.quantity}
                                isOrderHistory={true}
                            />
                        )
                    )}
                </div>

                <div>
                    <p className="text-xl">
                        Total: <b>{order.totalAmount} zł</b>
                    </p>
                </div>
            </div>
        </div>
    );
};
