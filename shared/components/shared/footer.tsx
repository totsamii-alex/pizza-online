import React from "react";
import { cn } from "@/shared/lib/utils";
import { Container } from "./container";
import {
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Mail,
    Phone,
    MapPin,
    Globe,
    HelpCircle,
} from "lucide-react";

interface FooterProps {
    className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className }) => {
    return (
        <footer className={cn("bg-gray-900 text-gray-100", className)}>
            {/* Grid для адаптивной верстки */}
            <Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-12 px-4 sm:px-6 lg:px-8">
                {/* About Section */}
                <div className="flex flex-col space-y-6">
                    <h2 className="text-2xl font-bold">About Us</h2>
                    <p className="text-gray-400">
                        We are committed to providing the best service and
                        quality. Our team of experts is here to ensure your
                        satisfaction.
                    </p>
                    <div className="flex space-x-4">
                        <a
                            href="https://facebook.com"
                            aria-label="Facebook"
                            className="text-gray-400 hover:text-gray-100 transition-colors"
                        >
                            <Facebook className="w-6 h-6" />
                        </a>
                        <a
                            href="https://twitter.com"
                            aria-label="Twitter"
                            className="text-gray-400 hover:text-gray-100 transition-colors"
                        >
                            <Twitter className="w-6 h-6" />
                        </a>
                        <a
                            href="https://instagram.com"
                            aria-label="Instagram"
                            className="text-gray-400 hover:text-gray-100 transition-colors"
                        >
                            <Instagram className="w-6 h-6" />
                        </a>
                        <a
                            href="https://www.linkedin.com/feed/"
                            aria-label="LinkedIn"
                            className="text-gray-400 hover:text-gray-100 transition-colors"
                        >
                            <Linkedin className="w-6 h-6" />
                        </a>
                    </div>
                </div>

                {/* Contact Section */}
                <div className="flex flex-col space-y-6">
                    <h2 className="text-2xl font-bold">Contact Us</h2>
                    <div className="flex items-center space-x-3">
                        <Mail className="w-6 h-6 text-gray-400" />
                        <a
                            href="mailto:flavorwebstudio@gmail.com"
                            className="text-gray-400 hover:text-gray-100"
                        >
                            flavorwebstudio@gmail.com
                        </a>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Phone className="w-6 h-6 text-gray-400" />
                        <a
                            href="tel:+48732622324"
                            className="text-gray-400 hover:text-gray-100"
                        >
                            +48 732 622 324
                        </a>
                    </div>
                    <div className="flex items-center space-x-3">
                        <MapPin className="w-6 h-6 text-gray-400" />
                        <p className="text-gray-400">Kraków, Poland</p>
                    </div>
                </div>

                {/* Newsletter Section */}
                <div className="flex flex-col space-y-6">
                    <h2 className="text-2xl font-bold">
                        Subscribe to Newsletter
                    </h2>
                    <p className="text-gray-400">
                        Get the latest updates and offers.
                    </p>
                    <div className="flex flex-col gap-3">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="p-2 rounded-md bg-gray-800 border border-gray-600 focus:outline-none focus:border-gray-400"
                        />
                        <button className="py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                            Subscribe
                        </button>
                    </div>
                </div>

                {/* Quick Links Section */}
                <div className="flex flex-col space-y-6">
                    <h2 className="text-2xl font-bold">Quick Links</h2>
                    <ul className="space-y-3">
                        <li>
                            <a
                                href="/news"
                                className="text-gray-400 hover:text-gray-100"
                            >
                                Latest News
                            </a>
                        </li>
                        <li>
                            <a
                                href="/help"
                                className="text-gray-400 hover:text-gray-100"
                            >
                                Help & Support
                            </a>
                        </li>
                        <li>
                            <a
                                href="/terms"
                                className="text-gray-400 hover:text-gray-100"
                            >
                                Terms of Service
                            </a>
                        </li>
                        <li>
                            <a
                                href="/privacy"
                                className="text-gray-400 hover:text-gray-100"
                            >
                                Privacy Policy
                            </a>
                        </li>
                    </ul>
                </div>
            </Container>

            <hr className="my-8 border-gray-700" />

            <Container className="flex flex-col md:flex-row justify-between items-center text-gray-400 px-4 sm:px-6 lg:px-8">
                <p className="text-sm text-center md:text-left">
                    We’re here to help you. Reach out to us anytime.
                </p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                    <a href="/main">
                        <Globe className="w-6 h-6 hover:text-gray-100 transition-colors" />
                    </a>
                    <a href="/help">
                        <HelpCircle className="w-6 h-6 hover:text-gray-100 transition-colors" />
                    </a>
                </div>
            </Container>

            <div className="border-t border-gray-700 mt-8 py-6 text-center text-gray-400">
                <p>
                    &copy; {new Date().getFullYear()} Your Company. All rights
                    reserved.
                </p>
            </div>
        </footer>
    );
};
