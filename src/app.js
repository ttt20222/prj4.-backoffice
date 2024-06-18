import { prisma } from "./utils/prisma/index.js";
import express from "express";
import { SERVER_PORT } from "./constants/env.constant.js";
import { apiRouter } from "./routers/router.js"

const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRouter);

// 에러 핸들러
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

app.listen(SERVER_PORT, () => {
  console.log(SERVER_PORT, '포트로 서버가 열렸어요!');
});

export default app;