import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { CartService } from '../services/cart.service.js';

const cartService = new CartService();

export class CartController {

    createCart = async (req, res, next) => {
        try{
            const { restaurantId , menuId, menuCount } = req.body;

            const cart = await cartService.createCartDetail(restaurantId , menuId, menuCount);

            return res.status(HTTP_STATUS.CREATED).json({
                status: HTTP_STATUS.CREATED,
                message: "장바구니에 메뉴가 추가되었습니다.",
                data: cart,
            });

        }catch(error){
            next(error);
        }
    }
}