"use client";

import React from "react";
import { FormTextarea } from "../form";
import { Controller, useFormContext } from "react-hook-form";
import { WhiteBlock } from "../whiteBlock";
import { ErrorText } from "../errorText";
import { AddressInput } from "../addressInput";
import { cn } from "@/shared/lib/utils";

interface CheckoutAddressFormProps {
    className?: string;
}

export const CheckoutAddressForm: React.FC<CheckoutAddressFormProps> = ({
    className,
}) => {
    const { control } = useFormContext();
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACE_KEY as string;

    return (
        <WhiteBlock title="3. Delivery address" className={className}>
            <div className="flex flex-col gap-5">
                <Controller
                    control={control}
                    name="address"
                    render={({ field, fieldState }) => (
                        <div>
                            <AddressInput
                                apiKey={apiKey}
                                onChange={field.onChange}
                                className={cn(
                                    "h-12 text-md pr-11 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                                    {
                                        "border-red-500":
                                            fieldState.error?.message,
                                    }
                                )}
                            />

                            {fieldState.error?.message && (
                                <ErrorText
                                    className="mt-2"
                                    text={fieldState.error.message}
                                />
                            )}
                        </div>
                    )}
                />

                <FormTextarea
                    name="comment"
                    className="text-base transition-colors duration-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Comments on the order"
                    rows={5}
                />
            </div>
        </WhiteBlock>
    );
};
