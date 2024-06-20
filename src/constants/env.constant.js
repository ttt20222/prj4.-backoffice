import dotenv from 'dotenv';
dotenv.config();

export const DATABASE_URL = process.env.DATABASE_URL;
export const SERVER_PORT = process.env.SERVER_PORT;
export const SERVER_IP = process.env.SERVER_IP;
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const MAILPASS = process.env.MAILPASS;