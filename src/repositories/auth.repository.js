import { prisma } from "../utils/prisma/index.js";

export class AuthRepository {
  /** email로 user 찾기 **/
  findUserByEmail = async (email) => {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  };

  /** userId로 RefreshToken 찾기 **/
  findRefreshTokenByUserId = async (userId) => {
    const existingRefreshToken = await prisma.refreshToken.findUnique({
      where: {
        userId: +userId,
      },
    });
    return existingRefreshToken;
  };

  /** userId로 user 찾기 **/
  findRefreshUserByUserId = async (userId) => {
    const user = await prisma.user.findUnique({
      where: {
        userId: +userId,
      },
    });
    return user;
  };

  /** refreshToken Upsert 하기 **/
  upsertToken = async (userId, hashedRefreshToken) => {
    const reToken = await prisma.refreshToken.upsert({
      where: {
        userId,
      },
      update: {
        refreshToken: hashedRefreshToken,
      },
      create: {
        userId,
        refreshToken: hashedRefreshToken,
      },
    });
    return reToken;
  };
}
