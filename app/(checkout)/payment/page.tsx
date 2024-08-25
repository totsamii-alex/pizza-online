"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Container, Title } from "@/shared/components";
import { axiosInstance } from "@/shared/services/axios";

export interface PaymentProps {
    payment_status: string;
}

export default function PaymentPage({
    searchParams,
}: {
    searchParams: { [key: string]: string };
}) {
    const router = useRouter();
    const [paymentStatus, setPaymentStatus] = React.useState("");
    const sessionId = searchParams["session_id"];

    React.useEffect(() => {
        if (!sessionId) {
            router.push("/");
            return;
        }

        const checkPaymentStatus = async () => {
            try {
                const response = await axiosInstance.get<PaymentProps>(
                    `/checkout?session_id=${sessionId}`
                );

                if (response.data.payment_status === "paid") {
                    setPaymentStatus("success");
                } else {
                    setPaymentStatus("failed");
                }
            } catch (error) {
                console.error("Error when checking payment session:", error);
                setPaymentStatus("failed");
            }
        };

        if (sessionId) {
            checkPaymentStatus();
        } else {
            setPaymentStatus("failed");
        }

        const timer = setTimeout(() => {
            router.push("/");
        }, 10000);

        return () => clearTimeout(timer);
    }, [router, sessionId]);

    return (
        <Container className="mt-10 flex flex-col items-center justify-center text-center">
            {paymentStatus === "success" ? (
                <>
                    <Title
                        text="Payment Successful"
                        className="text-4xl font-bold mb-6"
                    />

                    <div className="bg-green-100 p-6 rounded-lg shadow-md mb-6">
                        <h2 className="text-2xl font-semibold text-green-700">
                            🎉 Congratulations!
                        </h2>

                        <p className="text-lg text-gray-800 mt-4">
                            Your payment was successfully processed. Thank you
                            for your purchase!
                        </p>

                        <p className="text-lg text-gray-600 mt-2">
                            You will be redirected to the homepage in a few
                            seconds.
                        </p>
                    </div>

                    <div className="animate-pulse">
                        <p className="text-sm text-gray-500">Redirecting...</p>
                    </div>
                </>
            ) : paymentStatus === "failed" ? (
                <>
                    <Title
                        text="Payment Cancelled"
                        className="text-4xl font-bold mb-6"
                    />

                    <div className="bg-red-100 p-6 rounded-lg shadow-md mb-6">
                        <h2 className="text-2xl font-semibold text-red-700">
                            ⚠️ Payment Cancelled
                        </h2>

                        <p className="text-lg text-gray-800 mt-4">
                            Unfortunately, your payment was not completed.
                            Please try again or contact support if you need
                            assistance.
                        </p>

                        <p className="text-lg text-gray-600 mt-2">
                            You will be redirected to the homepage in a few
                            seconds.
                        </p>
                    </div>

                    <div className="animate-pulse">
                        <p className="text-sm text-gray-500">Redirecting...</p>
                    </div>
                </>
            ) : (
                <div className="bg-yellow-100 p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-2xl font-semibold text-yellow-700">
                        ⏳ Processing Payment
                    </h2>
                    <p className="text-lg text-gray-800 mt-4">
                        Please wait while we confirm your payment.
                    </p>
                </div>
            )}
        </Container>
    );
}
