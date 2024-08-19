"use client";

import { cn } from "@/shared/lib/utils";
import { Api } from "@/shared/services/apiClient";
import { Product } from "@prisma/client";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDebounce } from "react-use";

interface SearchInputProps {
    className?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({ className }) => {
    const [searchQuery, setSearchQuery] = React.useState("");
    const [focused, setFocused] = React.useState(false);
    const [products, setProducts] = React.useState<Product[]>([]);

    useDebounce(
        async () => {
            try {
                const response = await Api.products.search(searchQuery);
                setProducts(response);
            } catch (error) {
                console.error(error);
            }
        },
        300,
        [searchQuery, focused]
    );

    const onCLickItem = () => {
        setFocused(false);
        setProducts([]);
        setSearchQuery("");
    };

    return (
        <>
            {focused && (
                <div
                    className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30"
                    onClick={() => setFocused(false)}
                ></div>
            )}

            <div
                className={cn(
                    "flex rounded-2xl flex-1 justify-between relative h-11 z-30",
                    className
                )}
            >
                <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
                <input
                    className="rounded-2xl outline-none w-full bg-gray-100 pl-11"
                    type="text"
                    placeholder="Search pizza..."
                    onFocus={() => setFocused(true)}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                {products.length > 0 && (
                    <div
                        className={cn(
                            "absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30",
                            focused && "visible opacity-100 top-12"
                        )}
                    >
                        {products.map((product) => (
                            <Link
                                key={product.id}
                                className="flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10"
                                href={`/product/${product.id}`}
                                onClick={onCLickItem}
                                scroll={false}
                            >
                                <Image
                                    className="rounded-sm"
                                    width={32}
                                    height={32}
                                    src={product.imageUrl}
                                    alt={product.name}
                                />
                                <span>{product.name}</span>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};
