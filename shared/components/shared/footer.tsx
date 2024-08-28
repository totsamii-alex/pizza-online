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
        <footer
            className={cn("border-t border-gray-200 bg-gray-100", className)}
        >
            <Container className="py-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0">
                    {/* About Section */}
                    <div className="flex flex-col space-y-4">
                        <h2 className="text-xl font-bold">About Us</h2>
                        <p className="text-gray-600">
                            We are committed to providing the best service and
                            quality. Our team of experts is here to ensure your
                            satisfaction.
                        </p>
                        <div className="flex space-x-4">
                            <a
                                href="https://facebook.com"
                                aria-label="Facebook"
                            >
                                <Facebook className="w-6 h-6 text-gray-600 hover:text-gray-800 transition-colors" />
                            </a>
                            <a href="https://twitter.com" aria-label="Twitter">
                                <Twitter className="w-6 h-6 text-gray-600 hover:text-gray-800 transition-colors" />
                            </a>
                            <a
                                href="https://instagram.com"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-6 h-6 text-gray-600 hover:text-gray-800 transition-colors" />
                            </a>
                            <a
                                href="https://www.linkedin.com/feed/"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="w-6 h-6 text-gray-600 hover:text-gray-800 transition-colors" />
                            </a>
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div className="flex flex-col space-y-4">
                        <h2 className="text-xl font-bold">Contact Us</h2>
                        <div className="flex items-center space-x-2">
                            <Mail className="w-6 h-6 text-gray-600" />
                            <a
                                href="mailto:alexrybka.ru@gmail.com"
                                className="text-gray-600 hover:text-gray-800"
                            >
                                alexrybka.ru@gmail.com
                            </a>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Phone className="w-6 h-6 text-gray-600" />
                            <a
                                href="tel:+1234567890"
                                className="text-gray-600 hover:text-gray-800"
                            >
                                +123 456 7890
                            </a>
                        </div>
                        <div className="flex items-center space-x-2">
                            <MapPin className="w-6 h-6 text-gray-600" />
                            <p className="text-gray-600">
                                1234 Street Name, City, Country
                            </p>
                        </div>
                    </div>

                    {/* Additional Sections */}
                    <div className="flex flex-col space-y-4">
                        <h2 className="text-xl font-bold">Quick Links</h2>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="/news"
                                    className="text-gray-600 hover:text-gray-800"
                                >
                                    Latest News
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/help"
                                    className="text-gray-600 hover:text-gray-800"
                                >
                                    Help & Support
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/terms"
                                    className="text-gray-600 hover:text-gray-800"
                                >
                                    Terms of Service
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/privacy"
                                    className="text-gray-600 hover:text-gray-800"
                                >
                                    Privacy Policy
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <hr className="my-8 border-gray-300" />

                <div className="flex flex-col md:flex-row justify-between items-center text-gray-600">
                    <p className="text-sm">
                        We’re here to help you. Reach out to us anytime.
                    </p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <a href="/main">
                            <Globe className="w-6 h-6 text-gray-600 hover:text-gray-800 transition-colors" />
                        </a>
                        <a href="/help">
                            <HelpCircle className="w-6 h-6 text-gray-600 hover:text-gray-800 transition-colors" />
                        </a>
                    </div>
                </div>

                <div className="border-t border-gray-300 mt-8 pt-4 text-center text-gray-600">
                    <p>
                        &copy; {new Date().getFullYear()} Your Company. All
                        rights reserved.
                    </p>
                </div>
            </Container>
        </footer>
    );
};
