import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { OrderService } from '../services/order.service.js';

const orderService = new OrderService();

export class OrderController {
    //주문생성
    createOrder = async (req, res, next) => {
        try{
            //const { userId } = req.user;
            const { userRequirment } = req.body;

            const order = await orderService.createOrder(userRequirment);

            return res.status(HTTP_STATUS.CREATED).json({
                status: HTTP_STATUS.CREATED,
                message: "주문에 성공하였습니다.",
                data: order,
            });

        }catch(error){
            next(error);
        }
    };

    //주문조회
    readOrders = async (req, res, next) => {
        try{
            //const { userId } = req.user;

            const orders = await orderService.readOrders();

            return res.status(HTTP_STATUS.OK).json({
                status: HTTP_STATUS.OK,
                message: "주문 조회에 성공하였습니다.",
                data: orders,
            });

        }catch(error){
            next(error);
        }
    }
}