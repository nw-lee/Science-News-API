import { PrismaClient } from '.prisma/client';
import {
  createCommentDto,
  deleteCommentDto,
  updateCommentDto,
} from '../interfaces/comment.dto';
import { checkPassword, hashPassword } from './password.hash';

export const createCommentByPostId = async (
  prisma: PrismaClient,
  postId: number,
  commentDto: createCommentDto,
) => {
  const username = Math.random().toString(16).slice(3, 9);
  const { password, content } = commentDto;

  const hash = await hashPassword(password);
  const comment = await prisma.comment.create({
    data: {
      username,
      password: hash,
      content: content,
      postId,
    },
  });
  return comment;
};

export const readCommentById = async (prisma: PrismaClient, id: number) => {
  const comment = await prisma.comment.findUnique({
    where: {
      id,
    },
  });
  if (!comment) return null;
  return comment;
};

export const updateCommentById = async (
  prisma: PrismaClient,
  commentId: number,
  updateDto: updateCommentDto,
) => {
  const { password, content } = updateDto;
  const comment = await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
  });
  if (!comment) return null;
  const isMatch = await checkPassword(comment.password, password);
  if (!isMatch) return null;
  const updated = await prisma.comment.update({
    where: {
      id: commentId,
    },
    data: {
      content: content,
    },
  });
  return updated;
};

export const deleteCommentById = async (
  prisma: PrismaClient,
  commentId: number,
  deleteDto: deleteCommentDto,
) => {
  const comment = await prisma.comment.findUnique({ where: { id: commentId } });
  if (!comment) return null;
  const isMatch = await checkPassword(comment.password, deleteDto.password);
  if (!isMatch) return null;
  const deleted = await prisma.comment.update({
    where: {
      id: commentId,
    },
    data: {
      content: '삭제된 댓글입니다.',
      deletedAt: new Date(),
    },
  });
  return deleted;
};
