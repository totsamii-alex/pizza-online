import React from "react";

interface PayOrderTemplateProps {
    orderId: number;
    totalAmount: number;
    paymentUrl: string;
}

export const PayOrderTemplate: React.FC<PayOrderTemplateProps> = ({
    orderId,
    totalAmount,
    paymentUrl,
}) => (
    <div>
        <h1>Order #{orderId}</h1>

        <p>
            Pay for your order in the amount of <b>{totalAmount} zł</b>. Go{" "}
            <a href={paymentUrl}>follow this link</a> to pay for your order.
        </p>
    </div>
);
