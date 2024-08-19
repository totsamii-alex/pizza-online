import { cn } from "@/shared/lib/utils";
import React from "react";

interface ErrorTextProps {
    text: string;
    className?: string;
}

export const ErrorText: React.FC<ErrorTextProps> = ({ text, className }) => {
    return <p className={cn("text-red-500 text-sm", className)}>{text}</p>;
};
