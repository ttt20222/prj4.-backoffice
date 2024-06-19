import { prisma } from "../utils/prisma/index.js";
import { Prisma } from "@prisma/client";

export class CartRepository {
    createCartDetail = async (restaurantId, menuId, menuCount) => {
        const [createCartDetail, updateCart] = await prisma.$transaction(async (tx) => {

            const updateCart = await tx.Cart.update({
                where: { UserId: 1 },
                data: { RestaurantId: restaurantId },
            });

            const createCartDetail = await tx.CartDetail.create({
                data: {
                    CartId: updateCart.cartId,
                    MenuId: menuId,
                    menuCount,
                },
            });

            return [createCartDetail, updateCart];
        });

        return createCartDetail;
    };

    readCarts = async () => {
        const findCartId = await prisma.Cart.findFirst({
            where: { UserId : 1},
            select : {cartId: true}
        });

        const readCarts = await prisma.CartDetail.findMany({
            where: { CartId : findCartId.cartId },
            select: {
                MenuId : true,
                Menu : {
                    select : {
                        menuName : true,
                        menuPrice : true,
                    },
                },
                menuCount : true,
            }
        });

        return readCarts;
    };

    updateCartDetail = async (menuCount, menuId) => {
        const findCartId = await prisma.Cart.findFirst({
            where: { UserId : 1},
            select : {cartId: true}
        });

        const updateCartMenuCount = await prisma.CartDetail.update({
            where: {
                CartId: findCartId.cartId,
                MenuId : +menuId},
            data: {
                menuCount : menuCount,
            },
        });

        return updateCartMenuCount;
    };

    deleteCartMenu = async (menuId) => {
        const findCartId = await prisma.Cart.findFirst({
            where: { UserId : 1},
            select : {cartId: true}
        });

        const deleteCartMenu = await prisma.CartDetail.delete({
            where: {
                CartId : findCartId.cartId,
                MenuId : +menuId,
            },
        });

        return deleteCartMenu;
    }
}