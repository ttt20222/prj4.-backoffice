import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;

export async function connectDB() {
  try {
    await prisma.$connect();
    console.log('DB 연결에 성공했습니다.');
  } catch (error) {
    console.error('DB 연결에 실패했습니다.', error);
  }
}
