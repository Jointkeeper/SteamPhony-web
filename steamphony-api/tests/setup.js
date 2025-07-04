const { PrismaClient } = require('@prisma/client');

// Use separate test database if provided
const prisma = new PrismaClient({
  datasources: {
    db: {
      url:
        process.env.DATABASE_URL_TEST ||
        process.env.DATABASE_URL ||
        'postgresql://postgres:password@localhost:5432/steamphony_dev',
    },
  },
});

// Clean tables before each test to maintain isolation
beforeEach(async () => {
  await prisma.metricEvent.deleteMany();
  await prisma.contentPiece.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

global.prisma = prisma; 