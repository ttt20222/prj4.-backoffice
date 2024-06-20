import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient(); // PrismaClient 인스턴스 생성

export default prisma; // prisma 인스턴스를 기본 내보내기로 설정

// 데이터베이스 연결 함수 정의
export async function connectDB() {
  try {
    await prisma.$connect(); // 데이터베이스 연결 시도
    console.log('DB 연결에 성공했습니다.'); // 연결 성공 시 메시지 출력
  } catch (error) {
    console.error('DB 연결에 실패했습니다.', error); // 연결 실패 시 에러 메시지 출력
  }
}
