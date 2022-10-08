import { PrismaClient } from '@prisma/client';
import logger from '../utils/logger';

export const prisma = new PrismaClient({ log: ['warn', 'error'] });

export async function connect() {
  try {
    await prisma.$connect();
    logger.info('Connected to DB');
  } catch (e) {
    logger.error(e);
    process.exit(1);
  }
}
