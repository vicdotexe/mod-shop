const router = require('express').Router();

const imageRoutes = require('./imageRoutes');
const postRoutes = require('./postRoutes');

router.use('/images', imageRoutes);
router.use('/posts', postRoutes);

module.exports = router;
