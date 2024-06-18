import { prisma } from "../utils/prisma/index.js";
import { Prisma } from "@prisma/client";

export class CartRepository {
    createCartDetail = async (restaurantId, menuId, menuCount) => {
        const [createdCartDetail, updatedCart] = await prisma.$transaction(async (tx) => {

            const updatedCart = await tx.Cart.update({
                where: { UserId: 1 },
                data: { RestaurantId: restaurantId },
            });

            const createdCartDetail = await tx.CartDetail.create({
                data: {
                    CartId: updatedCart.cartId,
                    MenuId: menuId,
                    menuCount,
                },
            });

            return [createdCartDetail, updatedCart];
        });

        return createdCartDetail;
    };
}