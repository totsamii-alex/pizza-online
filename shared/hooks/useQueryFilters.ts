import React from "react";
import qs from "qs";
import { PriceProps } from "./useFilters";
import { useRouter } from "next/navigation";

interface Filters {
    sizes: Set<string>;
    types: Set<string>;
    selectedIngredients: Set<string>;
    prices: PriceProps;
}

export const useQueryFilters = (filters: Filters) => {
    const router = useRouter();

    React.useEffect(() => {
        const params = {
            ...filters.prices,
            types: Array.from(filters.types),
            sizes: Array.from(filters.sizes),
            ingredients: Array.from(filters.selectedIngredients),
        };

        const query = qs.stringify(params, {
            arrayFormat: "comma",
        });

        router.push(`?${query}`, { scroll: false });
    }, [filters, router]);
};
