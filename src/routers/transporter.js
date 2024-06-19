import nodemailer from "nodemailer";
// import { MAILPASS } from "./env.constant.js";
export const transporter = nodemailer.createTransport({
    service: 'naver',
    host: 'smtp.naver.com',
    port: 587,
    auth: {
        user: 'baemin0404@naver.com',
        pass: 'TUFT8Y3PGM4E',
    },
});