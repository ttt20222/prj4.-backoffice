import { HttpError } from "../errors/http.error.js";
import { MESSAGES } from "../constants/message.constant.js";
import { AuthRepository } from "../repositories/auth.repository.js";

export class AuthService {
  authRepository = new AuthRepository();

  /** 토큰 생성 함수(+재발급) **/
  generateAuthTokens = async (payload) => {
    // 1. payload에서 userId 획득
    const userId = payload.id;

    // 2. payload로 accessToken, hashedRefreshToken 획득
    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    });
    const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    });
    const hashedRefreshToken = bcrypt.hashSync(refreshToken, HASH_SALT_ROUNDS);

    // 3-INPUT: 생성된 토큰 저장을 위해 repository로 필요한 정보 전달
    await this.authRepository.upsertToken(userId, hashedRefreshToken);

    // 4. 토큰생성 결과를 반환
    return { accessToken, refreshToken };
  };

  /** 로그인(+refreshToken) **/
  signIn = async (email, password) => {
    // 1. email로 해당 유저정보 가져오기
    const user = await this.authRepository.findUserByEmail(email);

    // 2. 비밀번호가 맞는지 확인
    const isPasswordMatched =
      user && bcrypt.compareSync(password, user.password);
    // 2-1. 만약 비밀번호가 일치하지 않으면
    if (!isPasswordMatched) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        status: HTTP_STATUS.UNAUTHORIZED,
        message: MESSAGES.AUTH.COMMON.UNAUTHORIZED,
      });
    }

    // 3. 페이로드
    const payload = { id: user.id };
    const data = await generateAuthTokens(payload);

    // 4. 결과물을 controller에 전달
    return data;
  };
}
