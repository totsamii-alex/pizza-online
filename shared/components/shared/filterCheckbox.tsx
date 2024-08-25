import React from "react";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/shared/lib/utils";

export interface FilterCheckboxProps {
    text: string;
    value: string;
    name?: string;
    endAdornment?: React.ReactNode;
    onCheckedChange?: (checked: boolean) => void;
    checked?: boolean;
}

export const FilterCheckbox: React.FC<FilterCheckboxProps> = ({
    text,
    value,
    name,
    endAdornment,
    onCheckedChange,
    checked,
}) => {
    return (
        <div
            className={cn(
                "flex items-center space-x-2 p-2 rounded-md transition-colors duration-200",
                {
                    "bg-gray-100": checked,
                }
            )}
        >
            <Checkbox
                onCheckedChange={onCheckedChange}
                checked={checked}
                value={value}
                className="rounded-[8px] w-6 h-6"
                id={`checkbox-${String(name)}-${String(value)}`}
            />
            <label
                htmlFor={`checkbox-${String(name)}-${String(value)}`}
                className={cn(
                    "leading-none cursor-pointer flex-1 text-gray-800 transition-colors duration-200",
                    {
                        "hover:text-primary": !checked,
                        "text-primary": checked,
                    }
                )}
            >
                {text}
            </label>
            {endAdornment}
        </div>
    );
};
