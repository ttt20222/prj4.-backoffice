import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
import { signUpValidator } from '../middlewares/validators/sign-up-validator.middleware.js';
import { signInValidator } from '../middlewares/validators/sign-in-validator.middleware.js';
import { PrismaClient } from '@prisma/client';
import {
    ACCESS_TOKEN_EXPIRES_IN,
    HASH_SALT_ROUNDS,
} from '../constants/auth.constant.js';
import { ACCESS_TOKEN_SECRET } from '../constants/env.constant.js';
import { transporter } from './transporter.js';
import { SERVER_IP, SERVER_PORT } from '../constants/env.constant.js'
import { MIN_PASSWORD_LENGTH } from '../constants/auth.constant.js';

const Prisma = new PrismaClient();
const authRouter = express.Router();

// 회원가입
authRouter.post('/sign-up', signUpValidator, async (req, res, next) => {
    try {
        const { email, password, name, nickname, phoneNumber, cityAddress, streetAddress, detailAddress } = req.body;

        // 이미 존재하는 이메일인지 확인
        const existedUser = await Prisma.user.findUnique({ where: { email } });

        // 이메일이 중복된 경우
        if (existedUser) {
            return res.status(HTTP_STATUS.CONFLICT).json({
                status: HTTP_STATUS.CONFLICT,
                message: MESSAGES.AUTH.COMMON.EMAIL.DUPLICATED,
            });
        }

        // 비밀번호 길이 검증
        if (password.length < MIN_PASSWORD_LENGTH) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                status: HTTP_STATUS.BAD_REQUEST,
                message: MESSAGES.AUTH.COMMON.PASSWORD.MIN_LENGTH,
            });
        }

        // 비밀번호를 해시화
        const hashedPassword = bcrypt.hashSync(password, HASH_SALT_ROUNDS);

        // 사용자 데이터 생성
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

        // 사용자 데이터 생성 확인
        const user = await Prisma.user.findFirst({ where: { email } });

        // 카트 생성
        const cart = await Prisma.cart.create({
            data: {
                userId: data.userId,
            },
        });

        // 비밀번호 필드를 undefined로 설정하여 응답에서 제거
        data.password = undefined;

        // 이메일 인증 URL 생성
        const url = `http://${SERVER_IP}:${SERVER_PORT}/api/auth/verify-email?email=${email}`;
        // 인증 이메일을 전송
        await transporter.sendMail({
            from: "baemin0404@naver.com",
            to: email,
            subject: "[baemin] 회원가입 인증 메일입니다.",
            html: `<form action="${url}" method="POST">
          <h2 style="margin: 20px 0">[baemin] 이메일 인증 버튼을 클릭해 주세요.</h2>
          <p> 인증 유효시간은 3분 입니다. 3분 안에 버튼을 클릭해 주세요! <p>
          <button style=" background-color: #C0C0C0; color:#000000; width: 80px; height:40px; border-radius: 20px; border: none;">이메일 인증</button>
         </form>`,
        });

        return res.status(HTTP_STATUS.CREATED).json({
            status: HTTP_STATUS.CREATED,
            message: MESSAGES.AUTH.SIGN_UP.VERIFYEMAIL
        });

    } catch (error) {
        console.log(error);
        next(error);
    }
});

// 로그인
authRouter.post('/sign-in', signInValidator, async (req, res, next) => {
    try {
        // 요청 본문에서 이메일과 비밀번호를 추출
        const { email, password } = req.body;

        // 사용자를 이메일로 찾기
        const user = await Prisma.user.findUnique({ where: { email } });

        // 비밀번호가 일치하는지 확인
        const isPasswordMatched =
            user && bcrypt.compareSync(password, user.password);

        // 이메일 인증 여부 확인
        if (user.isEmailValid === false) {
            return res.status(HTTP_STATUS.FORBIDDEN).json({
                status: HTTP_STATUS.FORBIDDEN,
                message: MESSAGES.AUTH.COMMON.EMAIL.ISEMAILVALID,
            });
        }

        // 비밀번호 확인
        if (!isPasswordMatched) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({
                status: HTTP_STATUS.UNAUTHORIZED,
                message: MESSAGES.AUTH.COMMON.UNAUTHORIZED,
            });
        }

        // JWT 페이로드 생성
        const payload = { id: user.userId };

        // JWT 액세스 토큰 생성
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
        // 요청 쿼리에서 이메일을 추출
        const { email } = req.query;

        // 사용자의 이메일 인증 상태를 업데이트
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
