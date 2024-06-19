import express from 'express';
import { RestaurantController } from '../controllers/restaurant.controller.js';
import { errorHandler } from '../middleware/error.middleware.js';

const router = express.Router();
const restaurantController = new RestaurantController();

router.get('/', (req, res, next) => restaurantController.searchRestaurants(req, res, next)); 
router.get('/:restaurantId', (req, res, next) => restaurantController.getRestaurantById(req, res, next)); 
router.post('/', (req, res, next) => restaurantController.createRestaurant(req, res, next)); 
router.patch('/:restaurantId', (req, res, next) => restaurantController.updateRestaurant(req, res, next)); 
router.delete('/:restaurantId', (req, res, next) => restaurantController.deleteRestaurant(req, res, next)); 

router.use(errorHandler);

export default router;
