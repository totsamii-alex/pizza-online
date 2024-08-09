import { Api } from "@/shared/services/apiClient";
import { Ingredient } from "@prisma/client";
import React from "react";

interface ReturnProps {
    ingredients: Ingredient[];
    loading: boolean;
}

export const useIngredients = (): ReturnProps => {
    const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        async function getIngredients() {
            try {
                const response = await Api.ingredients.getAll();
                setIngredients(response);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        getIngredients();
    }, []);

    return {
        ingredients,
        loading,
    };
};
