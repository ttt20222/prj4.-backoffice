import { prisma } from "../utils/prisma/index.js";

export class RestaurantRepository {
    findOrders = async (userId) => {
        const restaurant = await prisma.Restaurant.findFirst({
            where: { ownerId : userId },
            select: { restaurantId : true }
        });

        const orders = await prisma.order.findMany({
            where: { restaurantId: restaurant.restaurantId },
            include: {
                OrderDetail: {
                    select: {
                        menuId: true,
                        Menu: {
                            select: {
                                menuName: true,
                            },
                        },
                        menuPrice: true,
                        menuCount: true,
                    },
                },
            },
        });

        return orders;
    }
}