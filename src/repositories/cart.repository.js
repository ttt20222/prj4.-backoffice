import { prisma } from "../utils/prisma/index.js";
import { Prisma } from "@prisma/client";

export class CartRepository {
    createCartDetail = async (restaurantId, menuId, menuCount) => {
        const [createCartDetail, updateCart] = await prisma.$transaction(async (tx) => {

            const updateCart = await tx.Cart.update({
                where: { userId: 4 },
                data: { restaurantId: restaurantId },
            });

            const createCartDetail = await tx.CartDetail.create({
                data: {
                    cartId: updateCart.cartId,
                    menuId: menuId,
                    menuCount,
                },
            });

            return [createCartDetail, updateCart];
        });

        return createCartDetail;
    };

    readCarts = async () => {
        const findCartId = await prisma.Cart.findFirst({
            where: { userId : 4},
            select : {cartId: true}
        });

        const readCarts = await prisma.CartDetail.findMany({
            where: { cartId : findCartId.cartId },
            select: {
                menuId : true,
                menu : {
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
            where: { userId : 4},
            select : {cartId: true}
        });

        const updateCartMenuCount = await prisma.CartDetail.update({
            where: {
                cartId: findCartId.cartId,
                menuId : +menuId},
            data: {
                menuCount : menuCount,
            },
        });

        return updateCartMenuCount;
    };

    deleteCartMenu = async (menuId) => {
        const findCartId = await prisma.Cart.findFirst({
            where: { userId : 4},
            select : {cartId: true}
        });

        const deleteCartMenu = await prisma.CartDetail.delete({
            where: {
                cartId : findCartId.cartId,
                menuId : +menuId,
            },
        });

        return deleteCartMenu;
    }
}