import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
import { signUpValidator } from '../middlewares/validators/sign-up-validator.middleware.js';
import { signInValidator } from '../middlewares/validators/sign-in-validator.middleware.js';
// import { Prisma } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import {
    ACCESS_TOKEN_EXPIRES_IN,
    HASH_SALT_ROUNDS,
} from '../constants/auth.constant.js';
import { ACCESS_TOKEN_SECRET } from '../constants/env.constant.js';

const Prisma = new PrismaClient();
const authRouter = express.Router();

// 회원가입
authRouter.post('/sign-up', signUpValidator, async (req, res, next) => {
    try {
        const { email, password, name, nickname, phoneNumber, cityAddress, streetAddress, detailAddress } = req.body;

        const existedUser = await Prisma.user.findUnique({ where: { email } });

        // 이메일이 중복된 경우
        if (existedUser) {
            return res.status(HTTP_STATUS.CONFLICT).json({
                status: HTTP_STATUS.CONFLICT,
                message: MESSAGES.AUTH.COMMON.EMAIL.DUPLICATED,
            });
        }

        const hashedPassword = bcrypt.hashSync(password, HASH_SALT_ROUNDS);

        const data = await Prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                nickname,
                phoneNumber,
                cityAddress,
                streetAddress,
                detailAddress,
            },
        });

        const user = await Prisma.user.findFirst({ where: { email } });

        console.log(data.userId);

        const cart = await Prisma.cart.create({
            data: {
                userId: data.userId,
            },
        });

        data.password = undefined;

        // const [createdUser, createdCart] = await Prisma.$transaction(async (tx) => {
        //     const data = await tx.user.create({
        //         data: {
        //             email,
        //             password: hashedPassword,
        //             name,
        //             nickname,
        //             phoneNumber,
        //             cityAddress,
        //             streetAddress,
        //             detailAddress,
        //         },
        //     });

        //     console.log(data.userId);
        //     const cart = await tx.cart.create({
        //         data: {
        //             userId: data.userId,
        //         },
        //     });

        //     return [data, cart];
        // });

        // data.password = undefined;

        return res.status(HTTP_STATUS.CREATED).json({
            status: HTTP_STATUS.CREATED,
            message: MESSAGES.AUTH.SIGN_UP.SUCCEED,
            data,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// 로그인
authRouter.post('/sign-in', signInValidator, async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await Prisma.user.findUnique({ where: { email } });

        const isPasswordMatched =
            user && bcrypt.compareSync(password, user.password);

        // 이메일 인증 여부 확인
        if (user.isEmailValid === false) {
            return res.status(HTTP_STATUS.FORBIDDEN).json({
                status: HTTP_STATUS.FORBIDDEN,
                message: MESSAGES.AUTH.COMMON.EMAIL.ISEMAILVALID,
            });
        }

        // 패스워드 확인
        if (!isPasswordMatched) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({
                status: HTTP_STATUS.UNAUTHORIZED,
                message: MESSAGES.AUTH.COMMON.UNAUTHORIZED,
            });
        }

        const payload = { id: user.id };

        const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
            expiresIn: ACCESS_TOKEN_EXPIRES_IN,
        });

        return res.status(HTTP_STATUS.OK).json({
            status: HTTP_STATUS.OK,
            message: MESSAGES.AUTH.SIGN_IN.SUCCEED,
            data: { accessToken },
        });
    } catch (error) {
        next(error);
    }
});

// 이메일 인증
authRouter.post('/verify-email', async (req, res, next) => {
    try {
        const { email } = req.query;

        await Prisma.user.update({
            where: { email },
            data: { isEmailValid: true },
        });

        return res.status(200).json({
            status: HTTP_STATUS.OK,
            message: "이메일 인증에 성공했습니다.",
        });
    } catch (error) {
        next(error);
    }
});

export { authRouter };
