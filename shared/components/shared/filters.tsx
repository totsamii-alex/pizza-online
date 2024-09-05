"use client";

import React from "react";
import { useFilters, useIngredients, useQueryFilters } from "@/shared/hooks";
import { CheckboxFiltersGroup, RangeSlider, Title } from ".";
import { Button, Input } from "../ui";

interface FiltersProps {
    max?: number;
    min?: number;
    className?: string;
}

export const Filters: React.FC<FiltersProps> = ({
    className,
    max = 100,
    min = 0,
}) => {
    const { ingredients, loading } = useIngredients();
    const filters = useFilters(max);
    useQueryFilters(filters);

    const items = ingredients.map(({ id, name }) => ({
        value: String(id),
        text: name,
    }));

    return (
        <div className={className}>
            <Title
                text="Filtration"
                size="sm"
                className="mb-5 font-extrabold"
            />

            <div className="px-6 xl:px-0">
                {/* types pizza */}
                <CheckboxFiltersGroup
                    title="Type of dough"
                    name="types"
                    className="mb-5"
                    items={[
                        { text: "Thin", value: "1" },
                        { text: "Traditional", value: "2" },
                    ]}
                    limit={2}
                    onClickCheckbox={filters.toggleTypes}
                    selected={filters.types}
                    loading={loading}
                />

                {/* sizes pizza */}
                <CheckboxFiltersGroup
                    title="Pizza sizes"
                    name="sizes"
                    className="mb-5"
                    items={[
                        { text: "20 cm", value: "20" },
                        { text: "30 cm", value: "30" },
                        { text: "40 cm", value: "40" },
                    ]}
                    limit={3}
                    onClickCheckbox={filters.toggleSizes}
                    selected={filters.sizes}
                    loading={loading}
                />

                {/* price filter */}
                <div className="mt-5 border-y border-y-neutral-100 pt-5 pb-10 xl:pb-5">
                    <p className="font-bold mb-3">Price from and to:</p>
                    <div className="flex gap-3 mb-5">
                        <Input
                            type="number"
                            placeholder={String(min)}
                            min={min}
                            max={max}
                            value={String(filters.prices.priceFrom || min)}
                            onChange={(event) =>
                                filters.UpdatePrice(
                                    "priceFrom",
                                    Number(event.target.value)
                                )
                            }
                        />
                        <Input
                            type="number"
                            min={min}
                            max={max}
                            placeholder={String(max)}
                            value={String(filters.prices.priceTo || max)}
                            onChange={(event) =>
                                filters.UpdatePrice(
                                    "priceTo",
                                    Number(event.target.value)
                                )
                            }
                        />
                    </div>

                    <RangeSlider
                        min={min}
                        max={max}
                        step={1}
                        value={[
                            filters.prices.priceFrom || min,
                            filters.prices.priceTo || max,
                        ]}
                        onValueChange={([priceFrom, priceTo]) => {
                            filters.setPrices({ priceFrom, priceTo });
                        }}
                    />
                </div>
            </div>

            {/* ingredients */}
            <CheckboxFiltersGroup
                title="Ingredient"
                name="ingredient"
                limit={6}
                classNameIngredients="grid grid-cols-2 xl:flex"
                className="border-b border-y-neutral-100 py-5"
                defaultItems={items.slice(0, 6)}
                items={items}
                loading={loading}
                onClickCheckbox={filters.toggleIngredients}
                selected={filters.selectedIngredients}
            />

            {/* apply button */}
            <Button className="mt-8 w-full hidden xl:block">Apply</Button>
        </div>
    );
};
