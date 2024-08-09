import {
    Container,
    GroupVariants,
    ProductImage,
    Title,
} from "@/shared/components/shared";
import { prisma } from "@/prisma/prismaClient";
import { notFound } from "next/navigation";

export default async function ProductPage({
    params: { id },
}: {
    params: { id: string };
}) {
    const product = await prisma.product.findUnique({
        where: { id: Number(id) },
    });

    if (!product) {
        return notFound();
    }

    return (
        <Container className="flex flex-col my-10">
            <div className="flex flex-1">
                <ProductImage
                    imageUrl={product.imageUrl}
                    alt={product.name}
                    size={40}
                />

                <div className="w-[490px] bg-[#f6f6f6] p-7">
                    <Title
                        text={product.name}
                        size={"md"}
                        className="font-bold mb-1"
                    />

                    <p className="text-gray-400">
                        pizzapizza pizzapizza pizzapizza pizza pizza pizza pizza
                        pizzapizzapizza
                    </p>

                    <GroupVariants
                        value="30"
                        items={[
                            { name: "Mala 30 см", value: "30" },
                            { name: "Srednia 30 см", value: "20" },
                            {
                                name: "Duza 40 см",
                                value: "30",
                                disabled: true,
                            },
                        ]}
                    />
                </div>
            </div>
        </Container>
    );
}
