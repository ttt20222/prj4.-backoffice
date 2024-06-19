import express from "express";
import { reviewsRouter } from "./reviews.router.js";
import { HTTP_STATUS } from "../constants/http-status.constant.js";

const apiRouter = express.Router();

apiRouter.get("/api-check", (req, res, next) => {
  return res.status(HTTP_STATUS.OK).send("api works!!");
});
apiRouter.use("/restaurants", reviewsRouter);

export { apiRouter };
