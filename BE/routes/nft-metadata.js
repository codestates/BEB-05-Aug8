import { Router } from 'express';
const router = Router();
import { controller } from './../controllers/index.js';

// GET /items Router와 Controller를 연결합니다.
router.get('/', controller.metadata.get);
router.post('/', controller.metadata.post);

export default router;
