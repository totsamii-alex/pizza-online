import { Ingredient, Product, ProductItem } from "@prisma/client";

export type ProductWithRelations = Product & {
    items: ProductItem[];
    ingredients: Ingredient[];
};

export type ProductWithCategory = ProductWithRelations & {
    category: { name: string };
};

export interface ICartStateItem {
    id: number;
    productItemId: number;
    cartId: number;
    quantity: number;
    createdAt: string;
    updatedAt: string;
    ingredients: Ingredient[];
    productItem: {
        id: number;
        price: number;
        size: number | null;
        pizzaType: number | null;
        productId: number;
        createdAt: string;
        updatedAt: string;
        product: {
            id: number;
            name: string;
            imageUrl: string;
            details: string | null;
            description: string | null;
            categoryId: number;
            createdAt: string;
            updatedAt: string;
        };
    };
}
