import { HttpError } from '../errors/http.error.js';
import { OrderRepository } from '../repositories/order.repository.js';

const orderRepository = new OrderRepository();

export class OrderService {

    createOrder = async (userRequirment) => {
        const createOrder = await orderRepository.createOrder(userRequirment);

        return createOrder;
    };

    readOrders = async () => {
        const orders = await orderRepository.readOrders();

        return orders.map((order) => ({
            orderId : order.orderId,
            userId : order.userId,
            restaurantId : order.restaurantId,
            menuName: order.menuName,
            menuCount: order.menuCount,
            menuPrice: order.menuPrice,
            totalPrice: order.totalPrice,
            userRequirment : order.userRequirment,
            orderStatus : order.orderStatus,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
        }));
    };


}