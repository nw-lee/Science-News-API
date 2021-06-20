import { Post } from '.prisma/client';
import { Router } from 'express';
import { searchPostDto } from '../interfaces/post.search.dto';
import {
  getPostById,
  getPostsByKeyword,
  getPostsByPage,
} from '../services/posts';

const router = Router();

router.get('/:id', async (req, res) => {
  const pages = Math.floor(req.maxSize! / req.page!) + 1;
  const id = parseInt(req.params.id, 10);
  if (!id) {
    res.status(404).json({
      message: 'Path Not Found',
    });
    return;
  }
  const posts = await getPostsByPage(req.prisma!, id, req.page!);
  res.status(200).json({
    max: req.maxSize,
    pages,
    page: id,
    posts,
  });
  return;
});

router.get('/id/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!id) {
    res.status(404).json({
      message: 'Path Not Found',
    });
    return;
  }
  const post = await getPostById(req.prisma!, id);
  if (!post) {
    res.status(404).json({
      message: 'Page Not Found',
    });
    return;
  }
  res.status(200).json({
    post,
  });
});

router.get('/search/:keyword/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const keyword = req.params.keyword;
  if (!id) {
    res.status(404).json({
      message: 'Path Not Found',
    });
    return;
  }

  const posts = await getPostsByKeyword(req.prisma!, id, req.page!, keyword);

  res.json({
    posts,
    id,
    keyword,
  });
  return;
});

export default router;
