import express from "express";
import { signUpValidator } from "../middlewares/validators/sign-up-validator.middleware.js";
import { signInValidator } from "../middlewares/validators/sign-in-validator.middleware.js";
import { PrismaClient } from "@prisma/client";
import { requireRefreshToken } from "../middlewares/require-refresh-token.middleware.js";
import { AuthController } from "../controllers/auth.controller.js";

const authRouter = express.Router();

const authController = new AuthController();

/** 회원 가입 **/
authRouter.post("/sign-up", signUpValidator, authController.signUp);

/** 로그인(+refreshToken!!추가수정해야함) **/
authRouter.post("/sign-in", signInValidator, authController.signIn);

/** 이메일 인증 **/
authRouter.post("/verify-email", authController.verifyEmail);

/** 토큰 재발급 **/
authRouter.post("/token", requireRefreshToken, authController.reToken);

/** 로그아웃 **/
authRouter.post("/sign-out", authController.signOut);

export { authRouter };
