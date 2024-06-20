import express from "express";
import { toS3 } from "../middlewares/multer.middleware.js";
import { ReviewsController } from "../controllers/reviews.controller.js";
import { HTTP_STATUS } from "../constants/http-status.constant.js";

const reviewsRouter = express.Router();

// ReviewsController를 인스턴스화 시킨다.
const reviewsController = new ReviewsController();

/** 리뷰 서버 테스트 **/
reviewsRouter.get("/review-check", (req, res, next) => {
  return res.status(HTTP_STATUS.OK).send("review-works!!");
});

/** 리뷰 생성 C **/
reviewsRouter.post(
  "/:restaurantId/reviews",
  toS3.array("files", 5),
  reviewsController.createReview
);
/** 리뷰 조회 R **/
reviewsRouter.get("/:restaurantId/reviews", reviewsController.getReviews);

/** 리뷰 수정 U **/
reviewsRouter.patch(
  "/:restaurantId/reviews/:reviewId",
  reviewsController.updateReview
);

/** 리뷰 삭제 D **/
reviewsRouter.delete(
  "/:restaurantId/reviews/:reviewId",
  reviewsController.deleteReview
);

export { reviewsRouter };
