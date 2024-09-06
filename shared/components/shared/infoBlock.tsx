import React from "react";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { Title } from "./title";
import Link from "next/link";
import { cn } from "@/shared/lib/utils";
import Image from "next/image";

interface InfoBlockProps {
    title: string;
    text: string;
    className?: string;
    imageUrl?: string;
}

export const InfoBlock: React.FC<InfoBlockProps> = ({
    className,
    title,
    text,
    imageUrl,
}) => {
    return (
        <div
            className={cn(
                className,
                "flex flex-col lg:flex-row items-center justify-between w-full lg:w-[840px] gap-12"
            )}
        >
            <div className="flex flex-col">
                <div className="sm:w-[445px] text-center mx-auto lg:text-left">
                    <Title size="lg" text={title} className="font-extrabold" />
                    <p className="text-gray-400 text-lg">{text}</p>
                </div>

                <div className="flex gap-5 mt-10 mx-auto lg:mx-0">
                    <Link href="/main">
                        <Button variant="outline" className="gap-2">
                            <ArrowLeft />
                            Home
                        </Button>
                    </Link>
                    <a href="">
                        <Button
                            variant="outline"
                            className="text-gray-500 border-gray-400 hover:bg-gray-50"
                        >
                            Update
                        </Button>
                    </a>
                </div>
            </div>

            <Image
                src={imageUrl as string}
                alt={title}
                width={300}
                height={350}
            />
        </div>
    );
};
