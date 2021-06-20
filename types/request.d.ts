import { Prisma, PrismaClient } from '@prisma/client';

declare global {
  namespace Express {
    export interface Request {
      user?: number;
      prisma?: PrismaClient<
        Prisma.PrismaClientOptions,
        never,
        Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
      >;
      maxSize?: number;
      page?: number;
    }
  }
}
