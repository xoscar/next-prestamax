import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query'],
});

prisma.$on('beforeExit', (error) => {
  console.log('>>> PrismaClient beforeExit event', error);
});

export default prisma;
