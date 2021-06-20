import { PrismaClient } from '@prisma/client';
import express, { NextFunction } from 'express';
import UserRouter from './controllers/users';
import PostRouter from './controllers/posts';
import CommentRouter from './controllers/comments';
import SourceRouter from './controllers/sources';
import cors from 'cors';

const app = express();

const prisma = new PrismaClient();

app.use(express.json());
app.use(
  cors({
    origin: true,
  }),
);

app.use(async (req, res, next) => {
  req.prisma = prisma;
  req.maxSize = (await prisma.post.findMany()).length;
  req.page = 20;
  next();
});

app.use('/users', UserRouter);
app.use('/posts', PostRouter);
app.use('/sources', SourceRouter);
app.use('/comments', CommentRouter);

app.get('/check', (req, res) => {
  res.json({
    message: 'Successful',
  });
});

app.listen(5000, async () => {
  await prisma.$connect();
  console.log('Server Running on 5000');
});
