import express from 'express';
import { RestaurantController } from '../controllers/restaurant.controller.js';
import { createRestaurantValidator } from '../middlewares/validators/create-restaurant-validator.middleware.js';
import { updateRestaurantValidator } from '../middlewares/validators/update-restaurant-validator.middleware.js';

const router = express.Router();

const restaurantController = new RestaurantController();

//사장님이 레스토랑에 들어온 주문 확인
router.get('/orders', restaurantController.readOrder);

// 특정 업장 조회 라우트
router.get('/:restaurantId', restaurantController.getRestaurantById); 

// 업장 생성 라우트
router.post('/', createRestaurantValidator, restaurantController.createRestaurant); 

// 업장 수정 라우트
router.patch('/:restaurantId', updateRestaurantValidator, restaurantController.updateRestaurant); 

// 업장 삭제 라우트
router.delete('/:restaurantId', restaurantController.deleteRestaurant); 

export default router;