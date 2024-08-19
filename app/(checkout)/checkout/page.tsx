"use client";

import React from "react";
import { useCart } from "@/shared/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { checkoutFormSchema, CheckoutFormValues } from "@/shared/constans";
import {
    CheckoutAddressForm,
    CheckoutCart,
    CheckoutPersonalForm,
    CheckoutSidebar,
    Container,
    Title,
} from "@/shared/components";
import { createOrder } from "@/app/actions";
import toast from "react-hot-toast";

export default function CheckoutPage() {
    const [submitting, setSubmitting] = React.useState(false);

    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            address: "",
            comment: "",
        },
    });

    const { items, totalAmount, removeCartItem, loading, onClickCountButton } =
        useCart();

    const onSubmit: SubmitHandler<CheckoutFormValues> = async (data) => {
        try {
            setSubmitting(true);

            const url = await createOrder(data);

            toast.error(
                "The order has been successfully completed! 📝 Proceed to payment... ",
                {
                    icon: "✅",
                }
            );

            if (url) {
                location.href = url;
            }
        } catch (err) {
            console.log(err);
            setSubmitting(false);
            toast.error("Failed to create order", {
                icon: "❌",
            });
        }
    };

    return (
        <Container className="mt-10">
            <Title
                text="Placing an order"
                className="font-extrabold mb-8 text-[36px]"
            />

            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex gap-10">
                        <div className="flex flex-col gap-10 flex-1 mb-20">
                            <CheckoutCart
                                onClickCountButton={onClickCountButton}
                                removeCartItem={removeCartItem}
                                items={items}
                                loading={loading}
                            />

                            <CheckoutPersonalForm
                                className={
                                    loading
                                        ? "opacity-40 pointer-events-none"
                                        : ""
                                }
                            />

                            <CheckoutAddressForm
                                className={
                                    loading
                                        ? "opacity-40 pointer-events-none"
                                        : ""
                                }
                            />
                        </div>

                        <div className="w-[450px]">
                            <CheckoutSidebar
                                totalAmount={totalAmount}
                                loading={loading || submitting}
                            />
                        </div>
                    </div>
                </form>
            </FormProvider>
        </Container>
    );
}
