import express from 'express';
import { RestaurantController } from '../controllers/restaurant.controller.js';

const router = express.Router();

const restaurantController = new RestaurantController();

//사장님이 레스토랑에 들어온 주문 확인
router.get('/orders', restaurantController.readOrder);

export default router;