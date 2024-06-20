import { HTTP_STATUS } from '../constants/http-status.constant.js';

// 커스텀 HTTP 오류 클래스 정의
class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status; // HTTP 상태 코드
  }
}

// 오류 처리 미들웨어 함수 정의
function errorHandler(err, req, res, next) {
  console.error(err); // 서버 콘솔에 에러 로그 출력
  const status = err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR; // 에러 상태 코드 설정, 기본값은 서버 내부 오류(500)
  const message = err.message || '서버 오류'; // 에러 메시지 설정, 기본값은 '서버 오류'
  res.status(status).json({ status, errorMessage: message }); // 클라이언트에게 에러 상태 코드와 메시지를 JSON 형식으로 응답
}

export {
  HttpError, // 커스텀 HTTP 오류 클래스 내보내기
  errorHandler, // 오류 처리 미들웨어 함수 내보내기
};
