import { HTTP_STATUS } from '../constants/http-status.constant.js';

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

function errorHandler(err, req, res, next) {
  console.error(err);
  const status = err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const message = err.message || '서버 오류';
  res.status(status).json({ status, errorMessage: message });
}

export {
  HttpError,
  errorHandler,
};
