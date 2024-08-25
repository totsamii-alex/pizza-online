import React from "react";

interface Props {
    code: string;
}

export const VerificationUserTemplate: React.FC<Props> = ({ code }) => (
    <div
        style={{
            fontFamily: "Arial, sans-serif",
            color: "#333",
            padding: "20px",
            backgroundColor: "#f4f4f4",
            borderRadius: "10px",
            maxWidth: "600px",
            margin: "0 auto",
        }}
    >
        <h1 style={{ color: "#007bff" }}>Welcome!</h1>

        <p style={{ fontSize: "18px" }}>Here is your verification code:</p>
        <h2
            style={{
                backgroundColor: "#007bff",
                color: "#fff",
                padding: "10px 20px",
                display: "inline-block",
                borderRadius: "5px",
            }}
        >
            {code}
        </h2>

        <p style={{ marginTop: "20px", fontSize: "16px" }}>
            To confirm your registration, please click the link below:
        </p>
        <p>
            <a
                href={`http://localhost:3000/api/auth/verify?code=${code}`}
                style={{
                    color: "#fff",
                    backgroundColor: "#28a745",
                    padding: "10px 20px",
                    textDecoration: "none",
                    borderRadius: "5px",
                    display: "inline-block",
                }}
            >
                Confirm Registration
            </a>
        </p>

        <p style={{ marginTop: "40px", fontSize: "14px", color: "#888" }}>
            If you didn’t request this, please ignore this email.
        </p>
    </div>
);
