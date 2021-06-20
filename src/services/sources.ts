import { PrismaClient } from '.prisma/client';

export const getPostsBySource = async (
  prisma: PrismaClient,
  sourceId: number,
  id: number,
  page: number,
) => {
  const posts = await prisma.post.findMany({
    skip: (id - 1) * page,
    take: page,
    include: {
      Source: true,
      _count: {
        select: {
          comments: true,
        },
      },
    },
    orderBy: {
      publishedAt: 'desc',
    },
    where: {
      sourceId,
    },
  });
  return posts;
};

export const getSourceList = async (prisma: PrismaClient) => {
  const sources = await prisma.source.findMany();
  return sources;
};
