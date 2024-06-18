import { HttpError } from '../errors/http.error.js';
import { CartRepository } from '../repositories/cart.repository.js';

const cartRepository = new CartRepository();

export class CartService {

    createCartDetail = async (restaurantId , menuId, menuCount) => {
        const cart = await cartRepository.createCartDetail(restaurantId , menuId, menuCount);
        return cart;
    }
}