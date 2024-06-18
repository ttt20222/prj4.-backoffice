import { HttpError } from '../errors/http.error.js';
import { CartRepository } from '../repositories/cart.repository.js';

const cartRepository = new CartRepository();

export class CartService {

    createCartDetail = async (userId, restaurantId , menuId, menuCount) => {
        const cart = await cartRepository.createCartDetail(userId, restaurantId , menuId, menuCount);
        return cart;
    };

    readCarts = async() => {
        const readCarts = await cartRepository.readCarts();

        const returnCarts = readCarts.map((item) => ({
            menuId: item.MenuId,
            menuName: item.Menu.menuName,
            menuPrice: item.Menu.menuPrice,
            menuCount: item.menuCount,
          }));

        return returnCarts;
    };

    updateCartMenuCount = async (menuCount, menuId) => {
        const updateCart = await cartRepository.updateCartDetail(menuCount, menuId);

        const returnCarts = await this.readCarts();

        return returnCarts;
    };

    deleteCartMenu = async (menuId) => {
        const deleteCartMenu = await cartRepository.deleteCartMenu(menuId);

        return deleteCartMenu.MenuId;
    }
}