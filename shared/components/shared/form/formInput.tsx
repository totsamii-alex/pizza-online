"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "../../ui/input";
import { RequiredSymbol } from "../requiredSymbol";
import { ClearButton } from "../clearButton";
import { ErrorText } from "../errorText";
import { cn } from "@/shared/lib/utils";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    required?: boolean;
    className?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
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
        setValue(name, "", { shouldValidate: true });
    };

    return (
        <div className={className}>
            {label && (
                <p className="font-medium mb-2">
                    {label} {required && <RequiredSymbol />}
                </p>
            )}

            <div className="relative">
                <Input
                    className={cn(
                        "h-12 text-md pr-11 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                        {
                            "border-red-500": errorText,
                        }
                    )}
                    {...register(name)}
                    {...props}
                />

                {value && <ClearButton onClick={onClickClear} />}
            </div>

            {errorText && <ErrorText text={errorText} className="mt-2" />}
        </div>
    );
};
