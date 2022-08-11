const express = require('express');
const router = express.Router();
const nftRouter = require('./nft-metadata');
const mintingRouter = require('./minting');

router.use('/nft-metadata', nftRouter);
router.use('/minting', mintingRouter);

module.exports = router;
