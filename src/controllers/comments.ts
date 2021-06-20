import { Router } from 'express';
import {
  createCommentDto,
  deleteCommentDto,
  updateCommentDto,
} from '../interfaces/comment.dto';
import {
  createCommentByPostId,
  deleteCommentById,
  readCommentById,
  updateCommentById,
} from '../services/comments';

const router = Router();

router.post('/', async (req, res) => {
  const createDto: createCommentDto = req.body;
  const id = parseInt(createDto.postId, 10);
  if (!id) {
    res.status(404).json({
      message: 'Path Not Found',
    });
    return;
  }
  if (createDto.content.length < 10 || createDto.password.length < 8) {
    res.status(401).json({
      message: 'Value Invalid',
    });
  }
  const comment = await createCommentByPostId(req.prisma!, id, createDto);
  const { password, ...props } = comment;
  return res.json({
    comment: props,
  });
});

router.get('/id/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!id) {
    res.status(404).json({
      message: 'Path Not Found',
    });
    return;
  }
  const comment = await readCommentById(req.prisma!, id);
  if (!comment) {
    res.status(404).json({
      message: 'Path Not Found',
    });
    return;
  }
  const { password, ...props } = comment;
  return res.json({
    comment: props,
  });
});

router.put('/id/:id', async (req, res) => {
  const updateDto: updateCommentDto = req.body;
  const id = parseInt(req.params.id, 10);
  if (!id) {
    res.status(404).json({
      message: 'Path Not Found',
    });
    return;
  }
  const comment = await updateCommentById(req.prisma!, id, updateDto);
  if (!comment) {
    res.status(401).json({
      message: 'Path Not Found',
    });
    return;
  }
  const { password, ...props } = comment;
  return res.json({
    comment: props,
  });
});

router.delete('/id/:id', async (req, res) => {
  const deleteDto: deleteCommentDto = req.body;
  const id = parseInt(req.params.id, 10);
  if (!id) {
    res.status(404).json({
      message: 'Path Not Found',
    });
    return;
  }
  const comment = await deleteCommentById(req.prisma!, id, deleteDto);
  if (!comment) {
    res.status(404).json({
      message: 'Path Not Found',
    });
    return;
  }
  const { password, ...props } = comment;
  return res.json({
    comment: props,
  });
});

export default router;
