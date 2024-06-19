process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'your_jwt_secret'; 

import { PrismaClient } from '@prisma/client';

const prismaMock = new PrismaClient();

global.prisma = prismaMock;

beforeAll(async () => {
  await prismaMock.$connect();
});

afterAll(async () => {
  await prismaMock.$disconnect();
});
