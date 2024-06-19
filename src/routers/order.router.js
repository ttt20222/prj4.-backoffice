import express from 'express';
import { OrderController } from '../controllers/order.controller.js';

const router = express.Router();

const orderController = new OrderController();

router.post('/', orderController.createOrder);

export default router;