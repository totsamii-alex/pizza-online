import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Container, Title } from "@/shared/components";

export default function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6 text-center">
            <Title text={"404"} size="2xl" className="font-extrabold mb-5" />

            <p className="text-lg text-gray-600 mb-6">
                Oops! The page you’re looking for doesn’t exist.
            </p>

            <Link
                href="/"
                className="text-lg font-medium text-blue-500 hover:text-blue-700 transition-colors mb-6"
            >
                Go back to Home
            </Link>

            <div className="flex space-x-4">
                <a
                    href="https://facebook.com"
                    aria-label="Facebook"
                    className="text-gray-600 hover:text-gray-800 transition-colors"
                >
                    <Facebook className="w-8 h-8" />
                </a>
                <a
                    href="https://twitter.com"
                    aria-label="Twitter"
                    className="text-gray-600 hover:text-gray-800 transition-colors"
                >
                    <Twitter className="w-8 h-8" />
                </a>
                <a
                    href="https://instagram.com"
                    aria-label="Instagram"
                    className="text-gray-600 hover:text-gray-800 transition-colors"
                >
                    <Instagram className="w-8 h-8" />
                </a>
                <a
                    href="https://www.linkedin.com"
                    aria-label="LinkedIn"
                    className="text-gray-600 hover:text-gray-800 transition-colors"
                >
                    <Linkedin className="w-8 h-8" />
                </a>
            </div>
        </div>
    );
}
