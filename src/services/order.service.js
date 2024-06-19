import { HttpError } from '../errors/http.error.js';
import { OrderRepository } from '../repositories/order.repository.js';

const orderRepository = new OrderRepository();

export class OrderService {

    createOrder = async (userRequirment) => {
        const createOrder = await orderRepository.createOrder(userRequirment);

        return createOrder;
    };
}