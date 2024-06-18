import express from "express";
import { menusRouter } from "./menus.router.js";

const apiRouter = express.Router();

apiRouter.use("/restaurants", menusRouter);

export { apiRouter };
