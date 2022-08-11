const router = require('express').Router();
const controller = require('./../controllers');

// GET /items Router와 Controller를 연결합니다.
router.get('/', controller.metadata.get);

module.exports = router;
