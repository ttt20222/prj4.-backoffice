import { prisma } from "../utils/prisma/index.js";
import { Prisma } from "@prisma/client";

export class OrderRepository {
    createOrder = async (userRequirment) => {
        const findCart = await prisma.cart.findFirst({
            where: { UserId: 1 }
        });

        const findCartDetail = await prisma.cartDetail.findMany({
            where: { CartId: findCart.cartId },
            include: {
                Menu: {
                    select: {
                        menuPrice: true,
                    },
                },
            }
        });

        return await prisma.$transaction(async (tx) => {
            await tx.Cart.update({
                where: { UserId: 1 },
                data: {
                    RestaurantId: null,
                },
            });

            const totalPriceResult = await tx.$queryRaw`
                SELECT SUM(b.menu_price * a.menu_count) as totalPrice
                FROM cart_details a
                JOIN menus b ON a.menu_id = b.menu_id
                WHERE a.cart_id = ${findCart.cartId}`;

            const totalPrice = totalPriceResult[0]?.totalPrice || 0;

            const createOrder = await tx.Order.create({
                data: {
                    UserId: 1,
                    RestaurantId: findCart.RestaurantId,
                    userRequirment: userRequirment,
                    orderStatus: '음식 준비중',
                    totalPrice: totalPrice,
                },
            });

            const createOrderDetailsPromises = findCartDetail.map(cartDetail => {
                return tx.OrderDetail.create({
                    data: {
                        OrderId: createOrder.orderId,
                        MenuId: cartDetail.MenuId,
                        menuPrice: cartDetail.Menu.menuPrice,
                        menuCount: cartDetail.menuCount,
                    },
                });
            });

            await Promise.all(createOrderDetailsPromises);

            const deleteCartDetailsPromises = findCartDetail.map(cartDetail => {
                return tx.CartDetail.delete({
                    where: { cartDetailId: cartDetail.cartDetailId }
                });
            });

            await Promise.all(deleteCartDetailsPromises);

            return createOrder;
        });
    }
}