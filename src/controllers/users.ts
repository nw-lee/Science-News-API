import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  const user = {
    name: 'John Doe',
    age: 19,
    foo: 'bar',
  };
  res.json({
    user,
  });
  return;
});

export default router;
