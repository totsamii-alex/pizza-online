"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Container, Title } from "@/shared/components";

export default function CancelPage() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push("/");
        }, 10000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <Container className="mt-10 flex flex-col items-center justify-center text-center">
            <Title
                text="Payment Cancelled"
                className="text-4xl font-bold mb-6"
            />

            <div className="bg-red-100 p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-2xl font-semibold text-red-700">
                    ⚠️ Payment Cancelled
                </h2>

                <p className="text-lg text-gray-800 mt-4">
                    Unfortunately, your payment was not completed. Please try
                    again or contact support if you need assistance.
                </p>

                <p className="text-lg text-gray-600 mt-2">
                    You will be redirected to the homepage in a few seconds.
                </p>
            </div>

            <div className="animate-pulse">
                <p className="text-sm text-gray-500">Redirecting...</p>
            </div>
        </Container>
    );
}
