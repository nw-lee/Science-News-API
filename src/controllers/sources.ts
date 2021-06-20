import { Router } from 'express';
import { getPostsBySource, getSourceList } from '../services/sources';

const router = Router();

router.get('/:source_id/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const sourceId = parseInt(req.params.source_id);
  if (!id || !sourceId) {
    res.json({
      message: 'Path Not Found',
    });
    return;
  }
  const posts = await getPostsBySource(req.prisma!, sourceId, id, req.page!);
  res.json({
    posts,
    id,
    sourceId,
  });
  return;
});

router.get('/list', async (req, res) => {
  const sources = await getSourceList(req.prisma!);
  res.json({
    sources,
  });
  return;
});

export default router;
