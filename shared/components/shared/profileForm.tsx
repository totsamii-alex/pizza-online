"use client";

import { updateUserInfo } from "@/app/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "../ui";
import { Container } from "./container";
import { FormInput } from "./form";
import {
    formRegisterSchema,
    TFormRegisterValues,
} from "./modal/auth-modal/forms/schemas";
import { Title } from "./title";

interface Props {
    data: User;
}

export const ProfileForm: React.FC<Props> = ({ data }) => {
    const form = useForm({
        resolver: zodResolver(formRegisterSchema),
        defaultValues: {
            fullName: data.fullname,
            email: data.email,
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data: TFormRegisterValues) => {
        try {
            await updateUserInfo({
                email: data.email,
                fullname: data.fullName,
                password: data.password,
            });

            toast.error("Data updated 📝", {
                icon: "✅",
            });
        } catch (error) {
            return toast.error("Error updating data", {
                icon: "❌",
            });
        }
    };

    const onClickSignOut = () => {
        signOut({
            callbackUrl: "/",
        });
    };

    return (
        <Container className="mt-10 mb-[125px]">
            <Title
                text={`Personal information | #${data.id}`}
                size="md"
                className="font-bold"
            />

            <Link href={"/checkout/order-history"}>
                <Button variant={"outline"} className="w-96 mt-10 border">
                    My orders
                </Button>
            </Link>

            <FormProvider {...form}>
                <form
                    className="flex flex-col gap-5 w-96 mt-10"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <FormInput name="email" label="E-Mail" required />
                    <FormInput name="fullName" label="Full name" required />

                    <FormInput
                        type="password"
                        name="password"
                        label="New Password"
                        required
                    />
                    <FormInput
                        type="password"
                        name="confirmPassword"
                        label="Repeat password"
                        required
                    />

                    <Button
                        disabled={form.formState.isSubmitting}
                        className="text-base mt-10"
                        type="submit"
                    >
                        Save
                    </Button>

                    <Button
                        onClick={onClickSignOut}
                        variant="secondary"
                        disabled={form.formState.isSubmitting}
                        className="text-base"
                        type="button"
                    >
                        Log out
                    </Button>
                </form>
            </FormProvider>
        </Container>
    );
};
