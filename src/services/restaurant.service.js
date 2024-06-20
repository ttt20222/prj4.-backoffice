import { HttpError } from '../errors/http.error.js';
import { RestaurantRepository } from '../repositories/restaurant.repository.js';

const restaurantRepository = new RestaurantRepository();

export class RestaurantService {

    readOrder = async (userId, role) => {

        //사장님만 자기 업장의 주문 상태를 볼 수 있음.
        if(role != 'OWNER'){
            throw new HttpError.Forbidden('사장님이 아닙니다.');
        };

        const orders = await restaurantRepository.findOrders(userId);

        return orders.map((order) => ({
            orderId : order.orderId,
            userId : order.userId,
            restaurantId : order.restaurantId,
            userRequirment : order.userRequirment,
            orderStatus : order.orderStatus,
            totalPrice : order.totalPrice,
            menuId : order.menuId,
            menuName : order.menuName,
            menuPrice : order.menuPrice,
            menuCount : order.menuCount,
            createdAt : order.createdAt,
            updatedAt : order.updatedAt,
        }));
    };

}