"use client";

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/shared/components/ui/sheet";
import { PizzaSize, PizzaType } from "@/shared/constans/pizza";
import { useCart } from "@/shared/hooks";
import { getCartItemDetails } from "@/shared/lib";
import { cn } from "@/shared/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui";
import { CartDrawerItem } from "./cartDrawerItem";
import { Title } from "./title";

interface CartDrawerProps {
    className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<CartDrawerProps>> = ({
    children,
    className,
}) => {
    const { items, totalAmount, removeCartItem, onClickCountButton } =
        useCart();
    const [redirecting, setRedirecting] = React.useState(false);

    return (
        <div className={className}>
            <Sheet>
                <SheetTrigger asChild>{children}</SheetTrigger>
                <SheetContent className="flex flex-col justify-between pb-0 bg-[#f4f1ee]">
                    <div
                        className={cn(
                            "flex flex-col h-full",
                            !totalAmount && "justify-center"
                        )}
                    >
                        {totalAmount > 0 && (
                            <>
                                <SheetHeader>
                                    <SheetTitle>
                                        In your cart{" "}
                                        <span className="font-bold">
                                            {items.length} items
                                        </span>
                                    </SheetTitle>
                                    <SheetDescription>
                                        Your added to cart purchases
                                    </SheetDescription>
                                </SheetHeader>
                            </>
                        )}

                        {!totalAmount && (
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
                                    Add at least one pizza to complete your
                                    order
                                </p>

                                <SheetClose>
                                    <Button
                                        className="w-56 h-12 text-base"
                                        size="lg"
                                    >
                                        <ArrowLeft className="w-5 mr-2" />
                                        Go back
                                    </Button>
                                </SheetClose>
                            </div>
                        )}

                        {totalAmount > 0 && (
                            <>
                                <div className="flex flex-col flex-1 gap-2 -mx-6 mt-5 overflow-auto">
                                    {items.map((item) => (
                                        <CartDrawerItem
                                            key={item.id}
                                            id={item.id}
                                            imageUrl={item.imageUrl}
                                            details={getCartItemDetails(
                                                item.ingredients,
                                                item.pizzaType as PizzaType,
                                                item.pizzaSize as PizzaSize
                                            )}
                                            disabled={item.disabled}
                                            name={item.name}
                                            price={item.price}
                                            quantity={item.quantity}
                                            onClickCountButton={(type) =>
                                                onClickCountButton(
                                                    item.id,
                                                    item.quantity,
                                                    type
                                                )
                                            }
                                            onClickRemove={() =>
                                                removeCartItem(item.id)
                                            }
                                        />
                                    ))}
                                </div>

                                <SheetFooter className="-mx-6 bg-white p-8">
                                    <div className="w-full">
                                        <div className="flex mb-4">
                                            <span className="flex flex-1 text-lg text-neutral-500">
                                                Total
                                                <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                                            </span>

                                            <span className="font-bold text-lg">
                                                {totalAmount} zł
                                            </span>
                                        </div>

                                        <Link href="/checkout">
                                            <Button
                                                type="submit"
                                                className="relative overflow-hidden w-full h-12 text-base"
                                                loading={redirecting}
                                                onClick={() =>
                                                    setRedirecting(true)
                                                }
                                            >
                                                Place an order
                                                <ArrowRight className="w-5 ml-2" />
                                                <div className="flare"></div>
                                            </Button>
                                        </Link>
                                    </div>
                                </SheetFooter>
                            </>
                        )}
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
};
