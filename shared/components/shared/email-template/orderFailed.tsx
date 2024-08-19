import React from "react";

interface OrderFailedTemplateProps {
    orderId: number;
}

export const OrderFailedTemplate: React.FC<OrderFailedTemplateProps> = ({
    orderId,
}) => (
    <div>
        <h1>Payment Unsuccessful</h1>

        <p>
            We regret to inform you that your payment for order #{orderId} was
            not successfully processed.
        </p>
        <p>
            Please check your payment details and try again. If the issue
            persists, do not hesitate to contact our support team for
            assistance.
        </p>

        <p>Thank you for your understanding.</p>
    </div>
);
