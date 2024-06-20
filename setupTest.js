process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'your_jwt_secret'; // JWT 시크릿 키 설정

import { PrismaClient } from '@prisma/client';

const prismaMock = new PrismaClient(); // Prisma 클라이언트의 mock 객체 생성

// 전역으로 prismaMock 객체 설정
global.prisma = prismaMock;

// 모든 테스트 실행 전에 실행될 함수 설정
beforeAll(async () => {
  await prismaMock.$connect(); // Prisma 클라이언트 연결
});

// 모든 테스트 실행 후에 실행될 함수 설정
afterAll(async () => {
  await prismaMock.$disconnect(); // Prisma 클라이언트 연결 해제
});
