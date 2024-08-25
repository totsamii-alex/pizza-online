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
    <div
        style={{
            fontFamily: "Arial, sans-serif",
            color: "#333",
            padding: "20px",
            backgroundColor: "#fff",
            borderRadius: "10px",
            maxWidth: "600px",
            margin: "0 auto",
            border: "1px solid #ddd",
        }}
    >
        <h1 style={{ color: "#28a745" }}>Order #{orderId}</h1>

        <p style={{ fontSize: "18px", marginBottom: "20px" }}>
            Please pay for your order in the amount of{" "}
            <b style={{ color: "#dc3545" }}>{totalAmount} zł</b>.
        </p>
        <p>
            <a
                href={paymentUrl}
                style={{
                    color: "#fff",
                    backgroundColor: "#007bff",
                    padding: "10px 20px",
                    textDecoration: "none",
                    borderRadius: "5px",
                    display: "inline-block",
                }}
            >
                Pay Now
            </a>
        </p>

        <p style={{ marginTop: "40px", fontSize: "14px", color: "#888" }}>
            If you have any questions or issues, please contact our support.
        </p>
    </div>
);
