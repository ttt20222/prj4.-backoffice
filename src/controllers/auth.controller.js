import { MESSAGES } from "../constants/message.constant.js";
import { HTTP_STATUS } from "../constants/http-status.constant.js";
import { AuthService } from "../services/auth.service.js";
import { AuthRepository } from "../repositories/auth.repository.js";

export class AuthController {
  authService = new AuthService();
  authRepository = new AuthRepository();

  /** 로그인 (+refreshToken) **/
  signIn = async (req, res, next) => {
    try {
      // 1. 필요한 정보 가져오기
      const { email, password } = req.body;
      // 2-INPUT: 로그인에 필요한 정보를 service에 전달
      const singInData = await this.authService.signIn(email, password);
      // 2-OUTPUT: 로그인 하면서 토큰을 전달 받음

      // 3. 로그인 결과를 클라이언트에 반환
      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.AUTH.SIGN_IN.SUCCEED,
        data: singInData,
      });
    } catch (err) {
      next(err);
    }
  };

  /** 토큰 재발급 **/
  reToken = async (req, res, next) => {
    try {
      // 1. 필요한 정보 가져오기
      const user = req.user;
      const payload = { id: user.id };

      // 2. 토큰 재발급에 필요한 정보를 service에 넘겨주기
      const reTokenData = await this.authService.generateAuthTokens(payload);

      // 3. 토큰 재발급 결과를 클라이언트에 반환
      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.AUTH.SIGN_IN.SUCCEED,
        data: reTokenData,
      });
    } catch (err) {
      next(err);
    }
  };
}
