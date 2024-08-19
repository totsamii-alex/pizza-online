// import { CartDTO, CreateCartItemValues } from './dto/cart.dto';
import { axiosInstance } from "./axios";
import { CartDto, CreateCartItemValues } from "./dto/cartDto";

export const getCart = async (): Promise<CartDto> => {
    return (await axiosInstance.get<CartDto>("/cart")).data;
};

export const updateItemQuantity = async (
    itemId: number,
    quantity: number
): Promise<CartDto> => {
    return (await axiosInstance.patch<CartDto>("/cart/" + itemId, { quantity }))
        .data;
};

export const removeCartItem = async (id: number): Promise<CartDto> => {
    return (await axiosInstance.delete<CartDto>("/cart/" + id)).data;
};

export const addCartItem = async (
    values: CreateCartItemValues
): Promise<CartDto> => {
    return (await axiosInstance.post<CartDto>("/cart", values)).data;
};
