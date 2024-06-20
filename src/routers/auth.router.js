import express from "express";
import { requireRefreshToken } from "../middlewares/require-refresh-token.middleware.js";
import { AuthController } from "../controllers/auth.controller.js";

const authRouter = express.Router();

const authController = new AuthController();

/** 로그인(+refreshToken) **/
authRouter.post("/sign-in", authController.signIn);

/** 토큰 재발급 **/
authRouter.post("/token", requireRefreshToken, authController.reToken);

export { authRouter };
