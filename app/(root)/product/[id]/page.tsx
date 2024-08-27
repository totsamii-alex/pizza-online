import { prisma } from "@/prisma/prismaClient";
import {
    Container,
    ProductForm,
    ProductsGroupList,
} from "@/shared/components/shared";
import { Api } from "@/shared/services/apiClient";
import { notFound } from "next/navigation";

export default async function ProductPage({
    params: { id },
}: {
    params: { id: string };
}) {
    const product = await Api.products.searchProduct(id);

    if (!product) {
        return notFound();
    }

    const products = await Api.products.searchProductByCategory(
        (product?.categoryId).toString()
    );

    return (
        <Container className="flex flex-col mt-10 mb-[125px] g-15">
            <div>
                <p className="text-sm text-gray-400 mb-6">
                    <span className="font-bold">Main</span> /{" "}
                    <span className="font-bold">{product.category.name}</span> /{" "}
                    {product.name}
                </p>

                <ProductForm isPage={true} product={product} />
            </div>

            <ProductsGroupList title="Recommendations" items={products} />
        </Container>
    );
}
