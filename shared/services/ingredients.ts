import { Ingredient } from "@prisma/client";
import { axiosInstance } from "./axios";
import { ApiRoutes } from "./constans";

export const getAll = async (): Promise<Ingredient[]> => {
    return (await axiosInstance.get<Ingredient[]>(ApiRoutes.SEARCH_INGREDIENTS))
        .data;
};
