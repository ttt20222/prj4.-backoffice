import { HttpError } from '../errors/http.error.js';

export default function (err, req, res, next) {
    console.error(err);

    if (err instanceof HttpError.BadRequest) {
        return res.status(err.status).json({
            status: err.status,
            message: err.message,
        });
      };
  
    if (err instanceof HttpError.Conflict) {
        return res.status(err.status).json({
            status: err.status,
            message: err.message,
        });
      };
    
      if (err instanceof HttpError.Unauthorized) {
        return res.status(err.status).json({
            status: err.status,
            message: err.message,
        });
      };
    
      if (err instanceof HttpError.Forbidden) {
        return res.status(err.status).json({
            status: err.status,
            message: err.message,
        });
      };
    
      if (err instanceof HttpError.NotFound) {
        return res.status(err.status).json({
            status: err.status,
            message: err.message,
        });
      };

    return res.status(HttpError.InternalServerError.status).json({
        status: HttpError.InternalServerError.status,
        message: '예상치 못한 에러가 발생했습니다. 관리자에게 문의해 주세요.',
    });
  }