const router = require('express').Router();
const userRoutes = require('./userRoutes');
const bookRoutes = require('./bookRoutes');
const reviewRoutes = require('./reviewRoutes');
const googleRoutes = require('./googleRoutes')

router.use('/users', userRoutes);
router.use('/books', bookRoutes);
router.use('/reviews', reviewRoutes);
router.use('/google', googleRoutes);

module.exports = router;
