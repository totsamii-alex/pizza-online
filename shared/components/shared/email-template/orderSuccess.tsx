import { CartItemDto } from "@/shared/services/dto/cartDto";
import React from "react";

interface OrderSuccessTemplateProps {
    orderId: number;
    items: CartItemDto[];
}

export const OrderSuccessTemplate: React.FC<OrderSuccessTemplateProps> = ({
    orderId,
    items,
}) => (
    <div>
        <h1>Thanks for your purchase! 🎉</h1>

        <p>Your order #{orderId} has been paid. List of products:</p>

        <hr />

        <h2>Order Details:</h2>
        <ul>
            {items.map((item) => (
                <li key={item.id}>
                    {item.productItem.product.name} | {item.productItem.price}{" "}
                    zł x {item.quantity} pcs. ={" "}
                    {item.productItem.price * item.quantity} zł
                </li>
            ))}
        </ul>

        <hr />

        <p>
            We are now preparing your order and will notify you once it`s ready
            for delivery.
        </p>

        <p>
            If you have any questions or need further assistance, feel free to
            contact our support team.
        </p>

        <p>Best regards,</p>
        <p>The Online Pizza Team</p>
    </div>
);
