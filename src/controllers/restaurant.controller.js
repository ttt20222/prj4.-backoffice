import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { RestaurantService } from '../services/restaurant.service.js';

const restaurantService = new RestaurantService();

export class RestaurantController {

    readOrder = async (req, res, next) => {
        try {
        //const { userId , role } = req.user;
        const userId = 9;
        const role = 'USER';   //테스트 변경필요함

        const order = await restaurantService.readOrder(userId, role);

        return res.status(HTTP_STATUS.OK).json({
            status: HTTP_STATUS.OK,
            message: "레스토랑의 주문 내역입니다.",
            data: order,
        });

        }catch(error){
            next(error);
        }
    };
};