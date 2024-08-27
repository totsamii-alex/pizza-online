import { Product } from "@prisma/client";
import { axiosInstance } from "./axios";
import { ApiRoutes } from "./constans";
import { ProductWithRelations, ProductWithCategory } from "@/@types/prisma";

export const search = async (query: string): Promise<Product[]> => {
    return (
        await axiosInstance.get<Product[]>(ApiRoutes.SEARCH_PRODUCTS, {
            params: { query },
        })
    ).data;
};

export const searchProduct = async (
    productId: string
): Promise<ProductWithCategory> => {
    return (
        await axiosInstance.get<ProductWithCategory>(ApiRoutes.SEARCH_PRODUCT, {
            params: { productId },
        })
    ).data;
};

export const searchProductByCategory = async (
    categoryId: string
): Promise<ProductWithRelations[]> => {
    return (
        await axiosInstance.get<ProductWithRelations[]>(
            ApiRoutes.SEARCH_PRODUCTS_BY_CATEGORY,
            {
                params: { categoryId },
            }
        )
    ).data;
};
