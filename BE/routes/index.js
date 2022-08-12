import { Router } from 'express';
const router = Router();
import nftRouter from './nft-metadata.js';
import mintingRouter from './minting.js';

router.use('/nft-metadata', nftRouter);
router.use('/minting', mintingRouter);

export default router;
