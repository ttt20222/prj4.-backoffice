import express from "express";
import { reviewsRouter } from "./reviews.router.js";
import { menusRouter } from "./menus.router.js";
import CartRouter from './cart.router.js';
import OrderRouter from './order.router.js';
import { HTTP_STATUS } from "../constants/http-status.constant.js";

const apiRouter = express.Router();

apiRouter.get("/api-check", (req, res, next) => {
  return res.status(HTTP_STATUS.OK).send("api works!!");
});
apiRouter.use("/restaurants", reviewsRouter, menusRouter);
apiRouter.use('/carts', CartRouter);
apiRouter.use('/orders', OrderRouter);


export { apiRouter };
