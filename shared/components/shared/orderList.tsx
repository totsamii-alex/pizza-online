"use client";

import React from "react";
import { Container } from "./container";
import { Title } from "./title";
import { Order } from "@prisma/client";
import { OrderItem } from "./";

interface OrderListProps {
    orders: Order[];
    className?: string;
}

export const OrderList: React.FC<OrderListProps> = ({ orders, className }) => {
    return (
        <Container className="flex flex-col gap-12 mt-10 h-full">
            <Title text="My orders" size="2xl" className="font-bold" />

            <div className="flex flex-col gap-6 mb-20">
                {orders.map((order) => (
                    <OrderItem order={order} key={order.id} />
                ))}
            </div>
        </Container>
    );
};
