import express from "express";
import "./utils/prisma/index.js";
import { SERVER_PORT } from "./constants/env.constant.js";
import { HTTP_STATUS } from "./constants/http-status.constant.js";
import { apiRouter } from "./routers/index.js";
import { errorHandler } from "./middlewares/error-handler.middleware.js";

const app = express(); // Express 애플리케이션 인스턴스 생성

app.use(express.json()); // JSON 형식의 요청 본문을 구문 분석하는 미들웨어 추가
app.use(express.urlencoded({ extended: true })); // URL-encoded 형식의 요청 본문을 구문 분석하는 미들웨어 추가

app.get("/server-check", (req, res, next) => {
  return res.status(HTTP_STATUS.OK).send("server works!!");
});

app.use("/api", apiRouter);
app.use(errorHandler);

app.listen(SERVER_PORT, () => {
  console.log(SERVER_PORT, "포트로 서버가 열렸어요!");
});
