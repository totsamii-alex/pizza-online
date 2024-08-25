"use client";

import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { registerUser } from "@/app/actions";
import { TFormRegisterValues, formRegisterSchema } from "./schemas";
import { FormInput } from "../../../form";
import { Button } from "@/shared/components/ui";
import Image from "next/image";
import { Title } from "../../../title";

interface RegisterFormProps {
    onClose?: VoidFunction;
    onClickLogin?: VoidFunction;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
    onClose,
    onClickLogin,
}) => {
    const form = useForm<TFormRegisterValues>({
        resolver: zodResolver(formRegisterSchema),
        defaultValues: {
            email: "",
            fullName: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data: TFormRegisterValues) => {
        try {
            await registerUser({
                email: data.email,
                fullname: data.fullName,
                password: data.password,
            });

            toast.error("Registration successful 📝. Confirm your email", {
                icon: "✅",
            });

            onClose?.();
        } catch (error) {
            return toast.error("Invalid email or password", {
                icon: "❌",
            });
        }
    };

    return (
        <FormProvider {...form}>
            <form
                className="flex flex-col gap-5"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <div className="flex justify-between items-center">
                    <div className="mr-2">
                        <Title
                            text="Register"
                            size="md"
                            className="font-bold"
                        />
                        <p className="text-gray-400">
                            Enter your contact information to register
                        </p>
                    </div>
                    <Image
                        src="/assets/images/phone-icon.png"
                        alt="phone-icon"
                        width={60}
                        height={60}
                    />
                </div>

                <FormInput name="email" label="E-Mail" required />
                <FormInput name="fullName" label="Full name" required />
                <FormInput
                    name="password"
                    label="Password"
                    type="password"
                    required
                />
                <FormInput
                    name="confirmPassword"
                    label="Confirm your password"
                    type="password"
                    required
                />

                <Button
                    loading={form.formState.isSubmitting}
                    className="h-12 text-base"
                    type="submit"
                >
                    Register
                </Button>
            </form>
        </FormProvider>
    );
};
