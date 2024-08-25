import { hashSync } from "bcrypt";
import { prisma } from "./prismaClient";
import { categories, ingredients, products, pizzas } from "./constans";
import { Prisma, Product, StoryItemType } from "@prisma/client";

function getRandomIngredients(): number[] {
    const ingredients = Array.from({ length: 18 }, (_, index) => index + 1); // Массив от 1 до 18
    return ingredients.filter(() => Math.random() > 0.5);
}

const randoNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

function getRandomSubarray(): number[] {
    const arr = [1, 2, 3, 4, 5, 6];
    const result = [];

    for (const num of arr) {
        if (Math.random() > 0.5) {
            result.push(num);
        }
    }

    return result.length > 0 ? result : getRandomSubarray();
}

const generateProductItem = ({ productId }: { productId: number }) => {
    return {
        productId,
        price: randoNumber(10, 30),
    } as Prisma.ProductItemUncheckedCreateInput;
};

const generatePizzaItems = ({
    productId,
}: {
    productId: number;
    pizzaType?: 1 | 2;
    size?: 20 | 30 | 40;
}) => {
    const pizzas: Prisma.ProductItemUncheckedCreateInput[] = [
        {
            productId,
            price: randoNumber(30, 40),
            pizzaType: 1,
            size: 20,
        },
        {
            productId,
            price: randoNumber(40, 60),
            pizzaType: 1,
            size: 30,
        },
        {
            productId,
            price: randoNumber(60, 90),
            pizzaType: 1,
            size: 40,
        },
        {
            productId,
            price: randoNumber(25, 35),
            pizzaType: 2,
            size: 20,
        },
        {
            productId,
            price: randoNumber(35, 50),
            pizzaType: 2,
            size: 30,
        },
        {
            productId,
            price: randoNumber(50, 70),
            pizzaType: 2,
            size: 40,
        },
    ];

    const getRandom = getRandomSubarray();

    return pizzas.filter((_, index) => getRandom.includes(index + 1));
};

async function up() {
    await prisma.user.createMany({
        data: [
            {
                fullname: "User Test",
                email: "alice@example.com",
                password: hashSync("111111", 7),
                verified: new Date(),
                role: "USER",
            },
            {
                fullname: "Admin Test",
                email: "bob@example.com",
                password: hashSync("111111", 10),
                verified: new Date(),
                role: "ADMIN",
            },
        ],
    });

    await prisma.category.createMany({
        data: categories,
    });

    await prisma.ingredient.createMany({
        data: ingredients,
    });

    // create pizzas
    await prisma.product.createMany({
        data: pizzas.map((pizza) => ({ ...pizza, categoryId: 1 })),
    });

    // create other products
    await prisma.product.createMany({
        data: products,
    });

    // adding ingredients to pizzas
    const pizzasWithoutIngredients = await prisma.product.findMany({
        where: { categoryId: 1 },
    });

    for (const pizza of pizzasWithoutIngredients) {
        const ingredientIds = getRandomIngredients();

        await prisma.product.update({
            where: { id: pizza.id },
            data: {
                ingredients: {
                    connect: ingredientIds.map((id) => ({ id })),
                },
            },
        });
    }

    await prisma.productItem.createMany({
        data: [
            // Pizzas
            ...Array.from({ length: 21 }, (_, index) =>
                generatePizzaItems({
                    productId: index + 1,
                })
            ).flat(),

            // breakfast
            ...Array.from({ length: 7 }, (_, index) =>
                generateProductItem({ productId: index + 1 + 21 })
            ),

            // snacks
            ...Array.from({ length: 17 }, (_, index) =>
                generateProductItem({ productId: index + 1 + 21 + 7 })
            ),

            // cocktails
            ...Array.from({ length: 4 }, (_, index) =>
                generateProductItem({ productId: index + 1 + 21 + 7 + 17 })
            ),

            // coffe
            ...Array.from({ length: 7 }, (_, index) =>
                generateProductItem({ productId: index + 1 + 21 + 7 + 17 + 4 })
            ),

            // desserts
            ...Array.from({ length: 12 }, (_, index) =>
                generateProductItem({
                    productId: index + 1 + 21 + 7 + 17 + 4 + 7,
                })
            ),

            // drinks
            ...Array.from({ length: 7 }, (_, index) =>
                generateProductItem({
                    productId: index + 1 + 21 + 7 + 17 + 4 + 7 + 12,
                })
            ),

            // sauces
            ...Array.from({ length: 4 }, (_, index) =>
                generateProductItem({
                    productId: index + 1 + 21 + 7 + 17 + 4 + 7 + 12 + 7,
                })
            ),
        ],
    });

    await prisma.cart.createMany({
        data: [
            {
                userId: 1,
                totalAmount: 0,
                token: "11111",
            },
            {
                userId: 2,
                totalAmount: 0,
                token: "222222",
            },
        ],
    });

    await prisma.cartItem.create({
        data: {
            productItemId: 1,
            cartId: 1,
            quantity: 2,
            ingredients: {
                connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
            },
        },
    });

    await prisma.story.createMany({
        data: [
            {
                previewImageUrl: "/assets/story/st-1.jpg",
            },
            {
                previewImageUrl: "/assets/story/st-2.jpg",
            },
            {
                previewImageUrl: "/assets/story/st-3.jpg",
            },
            {
                previewImageUrl: "/assets/story/st-4.jpg",
            },
            {
                previewImageUrl: "/assets/story/st-5.jpg",
            },
            {
                previewImageUrl: "/assets/story/st-6.jpg",
            },
        ],
    });

    await prisma.storyItem.createMany({
        data: [
            {
                storyId: 1,
                sourceUrl: "/assets/story/group-1/pizza-grill-1.mp4",
                type: StoryItemType.VIDEOS,
            },
            {
                storyId: 1,
                sourceUrl: "/assets/story/group-1/delicious-pizza-1.mp4",
                type: StoryItemType.VIDEOS,
            },
            {
                storyId: 1,
                sourceUrl: "/assets/story/group-1/pizza-party-1.mp4",
                type: StoryItemType.VIDEOS,
            },
            {
                storyId: 2,
                sourceUrl: "/assets/story/group-2/pizza-design-2.mp4",
                type: StoryItemType.VIDEOS,
            },
            {
                storyId: 2,
                sourceUrl: "/assets/story/group-2/pizza-special-2.jpg",
                type: StoryItemType.IMAGES,
            },
            {
                storyId: 3,
                sourceUrl: "/assets/story/group-3/delicious-food-3.jpg",
                type: StoryItemType.IMAGES,
            },
            {
                storyId: 3,
                sourceUrl: "/assets/story/group-3/pizza-3.jpg",
                type: StoryItemType.IMAGES,
            },
            {
                storyId: 3,
                sourceUrl: "/assets/story/group-3/pizza-design-3.mp4",
                type: StoryItemType.VIDEOS,
            },
            {
                storyId: 3,
                sourceUrl: "/assets/story/group-3/pizza-special-3.jpg",
                type: StoryItemType.IMAGES,
            },
            {
                storyId: 4,
                sourceUrl: "/assets/story/group-4/dilicious-pizza-4.mp4",
                type: StoryItemType.VIDEOS,
            },
            {
                storyId: 5,
                sourceUrl: "/assets/story/group-5/restaurant-food-5.jpg",
                type: StoryItemType.IMAGES,
            },
            {
                storyId: 5,
                sourceUrl: "/assets/story/group-5/restaurant-food-menu-5.jpg",
                type: StoryItemType.IMAGES,
            },
            {
                storyId: 6,
                sourceUrl: "/assets/story/group-6/cappuccino-video-6.mp4",
                type: StoryItemType.VIDEOS,
            },
            {
                storyId: 6,
                sourceUrl: "/assets/story/group-6/milk-tea-menu-6.mp4",
                type: StoryItemType.VIDEOS,
            },
        ],
    });
}

async function down() {
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Story" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "StoryItem" RESTART IDENTITY CASCADE`;
}

async function main() {
    try {
        await down();
        await up();
    } catch (error) {
        console.error(error);
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
