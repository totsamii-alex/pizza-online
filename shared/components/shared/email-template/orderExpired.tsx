import React from "react";

interface OrderExpiredTemplateProps {
    orderId: number;
}

export const OrderExpiredTemplate: React.FC<OrderExpiredTemplateProps> = ({
    orderId,
}) => (
    <div>
        <h1>Payment Expired</h1>

        <p>
            We regret to inform you that the payment for your order #{orderId}{" "}
            has expired and was not completed.
        </p>
        <p>
            Due to the expiration, your order has not been processed. Please
            return to our website to place a new order or contact our support
            team if you need further assistance.
        </p>

        <p>Thank you for your understanding.</p>
    </div>
);
