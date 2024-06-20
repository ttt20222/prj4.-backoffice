import { prisma } from "../utils/prisma/index.js";
import { Prisma } from "@prisma/client";

export class CartRepository {
    //카트에 메뉴 담는 것 생성  (카트 테이블에 레스토랑 id 생성 + 카트디테일 테이블 생성)
    createCartDetail = async (userId, restaurantId, menuId, menuCount) => {
        const [createCartDetail, updateCart] = await prisma.$transaction(async (tx) => {

            const updateCart = await tx.Cart.update({
                where: { userId: userId },
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

    //카트 찾기
    readCarts = async (userId) => {
        const findCartId = await prisma.Cart.findFirst({
            where: { userId : userId},
            select : {cartId: true}
        });

        const readCarts = await prisma.CartDetail.findMany({
            where: { cartId : findCartId.cartId },
            select: {
                menuId : true,
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

    //카트 메뉴 업데이트
    updateCartDetail = async (userId, menuCount, menuId) => {
        const findCartId = await prisma.Cart.findFirst({
            where: { userId : userId},
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

    //카트에 메뉴 삭제
    deleteCartMenu = async (userId, menuId) => {
        const findCartId = await prisma.Cart.findFirst({
            where: { userId : userId},
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