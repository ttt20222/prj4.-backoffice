import Joi from "joi";
import { MESSAGES } from "../../constants/message.constant.js";

const shema = Joi.object({
  //   orderId, score, review
  orderId: Joi.number().required().messages({
    "any.required": MESSAGES.REVIEW.CREATE.NO_ORDER_ID,
  }),
  score: Joi.number().required().messages({
    "any.required": MESSAGES.REVIEW.CREATE.NO_SCORE,
  }),
  review: Joi.string().required().messages({
    "any.required": MESSAGES.REVIEW.CREATE.NO_REVIEW,
  }),
});

export const createReviewValidator = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (err) {
    next(err);
  }
};
