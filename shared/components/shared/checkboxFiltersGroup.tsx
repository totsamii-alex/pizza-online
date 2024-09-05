"use client";

import React from "react";
import { FilterCheckboxProps } from "./filterCheckbox";
import { Input, Skeleton } from "../ui";
import { FilterCheckbox } from ".";
import { cn } from "@/shared/lib/utils";

type Item = FilterCheckboxProps;

interface CheckboxFiltersGroupProps {
    title: string;
    items: Item[];
    defaultItems?: Item[];
    limit?: number;
    loading?: boolean;
    searchInputPlaceholder?: string;
    onClickCheckbox?: (id: string) => void;
    defaultValues?: string[];
    selected?: Set<string>;
    name: string;
    classNameIngredients?: string;
    className?: string;
}

export const CheckboxFiltersGroup: React.FC<CheckboxFiltersGroupProps> = ({
    title,
    items,
    defaultItems,
    limit = 5,
    searchInputPlaceholder = "Search...",
    loading = false,
    onClickCheckbox,
    selected,
    name,
    classNameIngredients,
    className,
}) => {
    const [showAll, setShowAll] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState("");

    const onSearchValueChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSearchValue(event.target.value);
    };

    if (loading) {
        return (
            <div className={className}>
                <p className="font-bold mb-3">{title}</p>

                {Array.from({ length: limit }).map((_, index) => (
                    <Skeleton key={index} className="h-7 mb-4 rounded-sm" />
                ))}

                {name === "ingredient" && (
                    <Skeleton className="w-28 h-7 rounded-sm" />
                )}
            </div>
        );
    }

    const list = showAll
        ? items.filter((item) =>
              item.text.toLowerCase().includes(searchValue.toLowerCase())
          )
        : (defaultItems || items).slice(0, limit);

    return (
        <div className={className}>
            <p className="font-bold mb-3">{title}</p>

            {showAll && (
                <div className="mb-5">
                    <Input
                        placeholder={searchInputPlaceholder}
                        onChange={onSearchValueChange}
                        className="bg-gray-50 border-none"
                    />
                </div>
            )}

            <div
                className={cn(
                    "flex flex-col gap-1 max-h-96 pr-2 overflow-auto scrollbar",
                    classNameIngredients
                )}
            >
                {list.map((item, index) => (
                    <FilterCheckbox
                        key={index}
                        text={item.text}
                        value={item.value}
                        name={name}
                        endAdornment={item.endAdornment}
                        checked={selected?.has(item.value)}
                        onCheckedChange={() => onClickCheckbox?.(item.value)}
                    />
                ))}
            </div>

            {items.length > limit && (
                <div
                    className={
                        showAll ? "border-t border-t-neutral-100 mt-4" : ""
                    }
                >
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="text-primary mt-4"
                    >
                        {showAll ? "Hide" : "+ Show all"}
                    </button>
                </div>
            )}
        </div>
    );
};
