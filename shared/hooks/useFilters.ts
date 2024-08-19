import { useSearchParams } from "next/navigation";
import React, { Dispatch, SetStateAction } from "react";
import { useSet } from "react-use";

export interface PriceProps {
    priceFrom?: number;
    priceTo?: number;
}

interface QuerySearchParams extends PriceProps {
    types: Set<string>;
    sizes: Set<string>;
    ingredients?: Set<string>;
}

interface ReturnProps extends QuerySearchParams {
    selectedIngredients: Set<string>;
    UpdatePrice: (name: keyof PriceProps, value: number) => void;
    setPrices: Dispatch<SetStateAction<PriceProps>>;
    toggleTypes: (id: string) => void;
    toggleSizes: (id: string) => void;
    toggleIngredients: (id: string) => void;
    prices: PriceProps;
}

export const useFilters = (max: number = 100): ReturnProps => {
    // Get search params
    const searctParams = useSearchParams() as unknown as Map<
        keyof QuerySearchParams,
        string
    >;

    // Filter types from search params
    const [types, { toggle: toggleTypes }] = useSet(
        new Set<string>(
            searctParams.has("types")
                ? searctParams.get("types")?.split(",")
                : []
        )
    );

    // Filter sizes from search params
    const [sizes, { toggle: toggleSizes }] = useSet(
        new Set<string>(
            searctParams.has("sizes")
                ? searctParams.get("sizes")?.split(",")
                : []
        )
    );

    // Filter prices from search params
    const [prices, setPrices] = React.useState<PriceProps>({
        priceFrom: Number(searctParams.get("priceFrom")) || undefined,
        priceTo: Number(searctParams.get("priceTo")) || undefined,
    });

    // Filter ingredients from search params
    const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
        new Set<string>(searctParams.get("ingredients")?.split(",") || [])
    );

    const UpdatePrice = (name: keyof PriceProps, value: number): void => {
        if (value > max) {
            setPrices((price) => ({ ...price, [name]: max }));
        } else {
            setPrices((price) => ({ ...price, [name]: value }));
        }
    };

    return React.useMemo(
        () => ({
            types,
            sizes,
            prices: {
                priceFrom: prices.priceFrom,
                priceTo: prices.priceTo,
            },
            selectedIngredients,
            UpdatePrice,
            toggleTypes,
            toggleSizes,
            toggleIngredients,
            setPrices,
        }),
        [types, sizes, prices, selectedIngredients]
    );
};
