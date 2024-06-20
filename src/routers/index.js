import express from "express";
import { authRouter } from "./auth.router.js";
import { reviewsRouter } from "./reviews.router.js";
import { menusRouter } from "./menus.router.js";
import CartRouter from './cart.router.js';
import OrderRouter from './order.router.js';
import { HTTP_STATUS } from "../constants/http-status.constant.js";
import { adminRouter } from "./admin.router.js";
import RestaurantRouter from './restaurants.router.js';

const apiRouter = express.Router();

apiRouter.use("/admin", adminRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/restaurants", reviewsRouter, menusRouter, RestaurantRouter);
apiRouter.use('/carts', CartRouter);
apiRouter.use('/orders', OrderRouter);

export { apiRouter };
