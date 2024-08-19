"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { Textarea } from "../../ui/textarea";
import { ClearButton } from "../clearButton";
import { cn } from "@/shared/lib/utils";

interface FormTextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    className?: string;
    name: string;
    label?: string;
    required?: boolean;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
    className,
    name,
    label,
    required,
    ...props
}) => {
    const {
        register,
        formState: { errors },
        watch,
        setValue,
    } = useFormContext();

    const value = watch(name);
    const errorText = errors[name]?.message as string;

    const onClickClear = () => {
        setValue(name, "");
    };

    return (
        <div>
            <p className="font-medium">
                {label} {required && <span className="text-red-500">*</span>}
            </p>

            <div className="relative">
                <Textarea
                    className={cn("h-12 text-md", className)}
                    {...register(name)}
                    {...props}
                />

                {value && <ClearButton onClick={onClickClear} />}
            </div>

            {errorText && (
                <p className="text-red-500 text-sm mt-2">{errorText}</p>
            )}
        </div>
    );
};
