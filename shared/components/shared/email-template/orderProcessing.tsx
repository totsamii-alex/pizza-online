import { CartItemDto } from "@/shared/services/dto/cartDto";
import React from "react";

interface OrderProcessingTemplateProps {
    orderId: number;
}

export const OrderProcessingTemplate: React.FC<
    OrderProcessingTemplateProps
> = ({ orderId }) => (
    <div>
        <h1>Your Order is Being Processed! 🚀</h1>
        <hr />

        <p>
            We have received your order #{orderId} and it is now being
            processed.
        </p>

        <p>
            Our team is working hard to get your order ready. We will update you
            with more details once your order is on it`s way.
        </p>

        <hr />
        <p>Best regards,</p>
        <p>The Online Pizza Team</p>
    </div>
);
