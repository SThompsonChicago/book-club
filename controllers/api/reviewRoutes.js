const router = require('express').Router();
const { User, Review, Book } = require('../../models');

// CREATE a review
router.post('/', async (req, res) => {
    try {
        const reviewData = await Review.create(req.body);
        res.status(200).json(reviewData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// GET a review
router.get('/:id', async (req, res) => {
    try {
        const reviewData = await Review.findByPk(req.params.id, {
            include: [{ model: User }, { model: Book }],
        });

        if (!reviewData) {
            res.status(404).json({ message: 'Review not found.'});
            return;
        }

        res.status(200).json(reviewData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;