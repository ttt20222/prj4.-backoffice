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

    updateOrderStatus = async (orderId) => {
        const findOrder = await orderRepository.findeOrder(orderId);

        if (!findOrder) {
            throw new HttpError.BadRequest("해당 주문이 없습니다.");
        };

        const order = await orderRepository.updateOrderStatus(orderId);

        return order;
    };
}