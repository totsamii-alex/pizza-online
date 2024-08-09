import {
    Filters,
    TopBar,
    Title,
    Container,
    ProductsGroupList,
} from "@/shared/components/shared";
import { prisma } from "@/prisma/prismaClient";

export default async function Home() {
    const categories = await prisma.category.findMany({
        include: {
            products: {
                include: {
                    ingredients: true,
                    items: true,
                },
            },
        },
    });

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

            <Container className="mt-10 pb-14">
                <div className="flex gap-20">
                    {/* left side - filtration */}
                    <div className="w-[250px]">
                        <Filters max={150} min={0} />
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
