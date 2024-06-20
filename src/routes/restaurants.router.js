import express from 'express';
import { RestaurantController } from '../controllers/restaurant.controller.js';
import { errorHandler } from '../middleware/error.middleware.js';

const router = express.Router(); // Express 라우터 생성
const restaurantController = new RestaurantController(); // RestaurantController 인스턴스 생성

// 업장 검색 라우트
router.get('/', (req, res, next) => restaurantController.searchRestaurants(req, res, next)); 
// 특정 업장 조회 라우트
router.get('/:restaurantId', (req, res, next) => restaurantController.getRestaurantById(req, res, next)); 
// 업장 생성 라우트
router.post('/', (req, res, next) => restaurantController.createRestaurant(req, res, next)); 
// 업장 수정 라우트
router.patch('/:restaurantId', (req, res, next) => restaurantController.updateRestaurant(req, res, next)); 
// 업장 삭제 라우트
router.delete('/:restaurantId', (req, res, next) => restaurantController.deleteRestaurant(req, res, next)); 

// 오류 처리 미들웨어 사용
router.use(errorHandler);

export default router; // 라우터를 모듈의 기본값으로 내보내기
