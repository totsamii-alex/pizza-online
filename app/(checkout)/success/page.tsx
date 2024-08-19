"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Container, Title } from "@/shared/components";

export default function SuccessPage() {
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
                text="Payment Successful"
                className="text-4xl font-bold mb-6"
            />

            <div className="bg-green-100 p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-2xl font-semibold text-green-700">
                    🎉 Congratulations!
                </h2>

                <p className="text-lg text-gray-800 mt-4">
                    Your payment was successfully processed. Thank you for your
                    purchase!
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
