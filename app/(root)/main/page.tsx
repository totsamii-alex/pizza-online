import {
    Filters,
    TopBar,
    Title,
    Container,
    ProductsGroupList,
    Stories,
} from "@/shared/components/shared";
import { Suspense } from "react";
import { findPizzas } from "@/shared/lib";
import { GetSearchParams } from "@/shared/lib/findPizzas";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Main Page | Online Pizza",
    description: "Welcome to Online Pizza - the best pizza in town!",
};

export default async function Home({
    searchParams,
}: {
    searchParams: GetSearchParams;
}) {
    const categories = await findPizzas(searchParams);

    return (
        <>
            <Container className="mt-10">
                <Title text="All orders" size="lg" className="font-extrabold" />
            </Container>

            <TopBar
                categories={categories.filter(
                    (category) => category.products.length > 0
                )}
            />

            <Stories />

            <Container className="mt-10 pb-14">
                <div className="flex gap-20">
                    {/* left side - filtration */}
                    <div className="w-[250px]">
                        <Suspense>
                            <Filters max={150} min={0} />
                        </Suspense>
                    </div>

                    {/* right side - list orders */}
                    <div className="flex-1">
                        <div className="flex flex-col gap-16">
                            {categories.map(
                                (category) =>
                                    category.products.length > 0 && (
                                        <ProductsGroupList
                                            key={category.id}
                                            title={category.name}
                                            categoryId={category.id}
                                            items={category.products}
                                            className="scroll-mt-[100px]"
                                        />
                                    )
                            )}
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}
