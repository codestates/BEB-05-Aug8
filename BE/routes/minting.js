import { Router } from 'express';
const router = Router();
import { controller } from './../controllers/index.js';

// GET /items Router와 Controller를 연결합니다.
router.post('/', controller.minting.post);

export default router;