import express from 'express';
import { SERVER_PORT } from './constants/env.constant.js';
import restaurantsRouter from './routes/restaurants.router.js';
import { errorHandler } from './middleware/error.middleware.js';

const app = express(); // Express 애플리케이션 인스턴스 생성

app.use(express.json()); // JSON 형식의 요청 본문을 구문 분석하는 미들웨어 추가
app.use(express.urlencoded({ extended: true })); // URL-encoded 형식의 요청 본문을 구문 분석하는 미들웨어 추가

app.use('/restaurants', restaurantsRouter); // '/restaurants' 경로로 들어오는 요청에 대해 restaurantsRouter 사용

// 오류 처리 미들웨어 등록
app.use(errorHandler);

// 서버 시작
app.listen(SERVER_PORT, () => {
  console.log(`Server is running on http://localhost:${SERVER_PORT}`); // 서버가 실행 중인 포트 출력
});

export default app; // app을 모듈의 기본값으로 내보내기