import express from 'express';
import { CartController } from '../controllers/cart.controller.js';

const router = express.Router();

const cartController = new CartController();

router.post('/', cartController.createCart);
router.get('/', cartController.readCart);
//router.patch('/menus/:menusId', cartController.updateCartMenuCount);

export default router;