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
import { useSession } from "next-auth/react";
import { Api } from "@/shared/services/apiClient";

export default function CheckoutPage() {
    const [submitting, setSubmitting] = React.useState(false);
    const { data: session, status } = useSession();
    const { items, totalAmount, removeCartItem, loading, onClickCountButton } =
        useCart();

    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            email: "",
            firstName: "",
            lastName: "",
            phone: "",
            address: "",
            comment: "",
        },
    });

    React.useEffect(() => {
        async function fetchUserInfo() {
            const data = await Api.auth.getMe();

            const [firstName, lastName] = data.fullname.split(" ");

            form.setValue("firstName", firstName);
            form.setValue("lastName", lastName);
            form.setValue("email", data.email);
        }

        if (session) {
            fetchUserInfo();
        }
    }, [session, form]);

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
                                    status === "loading"
                                        ? "opacity-40 pointer-events-none"
                                        : ""
                                }
                            />

                            <CheckoutAddressForm
                                className={
                                    status === "loading"
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
