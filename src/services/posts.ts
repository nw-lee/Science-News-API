import { PrismaClient } from '.prisma/client';

export const getPostsByPage = async (
  prisma: PrismaClient,
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
  });
  return posts;
};

export const getPostById = async (prisma: PrismaClient, id: number) => {
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      Source: true,
      comments: true,
    },
  });
  if (post) {
    post.comments.forEach((comment) => (comment.password = 'unknown'));
    post.comments.sort((a, b) => a.id - b.id);
  }
  return !post ? null : post;
};

export const getPostsByKeyword = async (
  prisma: PrismaClient,
  id: number,
  page: number,
  keyword: string,
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
      title: {
        contains: keyword,
      },
    },
  });
  return posts;
};
