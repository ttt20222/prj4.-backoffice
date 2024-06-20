import express from "express";
import { authRouter } from "./auth.router.js";
import { reviewsRouter } from "./reviews.router.js";
import { menusRouter } from "./menus.router.js";

const apiRouter = express.Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/restaurants", reviewsRouter, menusRouter);

export { apiRouter };
