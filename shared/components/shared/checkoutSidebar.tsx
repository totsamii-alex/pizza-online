import React from "react";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";
import { Button, Skeleton } from "../ui";
import { cn } from "@/shared/lib/utils";
import { WhiteBlock } from "./whiteBlock";
import { CheckoutItemDetails } from "./checkoutItemDetails";

const VAT = 10;
const DELIVERY_PRICE = 6;

interface CheckoutSidebarProps {
    totalAmount: number;
    loading?: boolean;
    className?: string;
}

export const CheckoutSidebar: React.FC<CheckoutSidebarProps> = ({
    totalAmount,
    loading,
    className,
}) => {
    const vatPrice = (totalAmount * VAT) / 100;
    const totalPrice = totalAmount + DELIVERY_PRICE + vatPrice;

    return (
        <WhiteBlock className={cn("p-6 sticky top-4", className)}>
            <div className="flex flex-col gap-1">
                <span className="text-xl">Total:</span>
                {loading ? (
                    <Skeleton className="h-11 w-48" />
                ) : (
                    <span className="h-11 text-[34px] font-extrabold">
                        {totalAmount !== 0 ? totalPrice : totalAmount} zł
                    </span>
                )}
            </div>

            <CheckoutItemDetails
                title={
                    <div className="flex items-center">
                        <Package size={18} className="mr-2 text-gray-400" />
                        Cart cost:
                    </div>
                }
                value={
                    loading ? (
                        <Skeleton className="h-6 w-16 rounded-[6px]" />
                    ) : (
                        `${totalAmount} zł`
                    )
                }
            />
            <CheckoutItemDetails
                title={
                    <div className="flex items-center">
                        <Percent size={18} className="mr-2 text-gray-400" />
                        VAT:
                    </div>
                }
                value={
                    loading ? (
                        <Skeleton className="h-6 w-16 rounded-[6px]" />
                    ) : (
                        `${vatPrice} zł`
                    )
                }
            />
            <CheckoutItemDetails
                title={
                    <div className="flex items-center">
                        <Truck size={18} className="mr-2 text-gray-400" />
                        Delivery:
                    </div>
                }
                value={
                    loading ? (
                        <Skeleton className="h-6 w-16 rounded-[6px]" />
                    ) : (
                        `${DELIVERY_PRICE} zł`
                    )
                }
            />

            <Button
                loading={loading}
                type="submit"
                className="relative overflow-hidden w-full h-14 rounded-2xl mt-6 text-base font-bold"
                disabled={totalAmount === 0}
            >
                Proceed to payment
                <ArrowRight className="w-5 ml-2" />

                {totalAmount !== 0 && <div className="flare"></div>}
            </Button>
        </WhiteBlock>
    );
};
