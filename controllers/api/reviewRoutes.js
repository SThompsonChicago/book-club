const router = require('express').Router();
const { User, Review, Book } = require('../../models');

// CREATE a review
router.post('/', async (req, res) => {
    try {
        const newReview = await Review.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newReview);
        console.log('Review posted.');
    } catch (err) {
        res.status(400).json(err);
        console.log('Review not posted.');
    }
});

// GET a review
router.get('/:id', async (req, res) => {
    try {
        const reviewData = await Review.findByPk(req.params.id, {
            include: [{ model: User }, { model: Book }],
        });

        if (!reviewData) {
            res.status(404).json({ message: 'Review not found.' });
            return;
        }

        res.status(200).json(reviewData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET all reviews
router.get('/', async (req, res) => {
    try {
        const reviewData = await Review.findAll({
        });
        res.status(200).json(reviewData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET all reviews from user with given id
router.get('/user/:id', async (req, res) => {
    try {
        const reviewData = await Review.findAll({
            where: {
                user_id: req.params.id,
            }
        });

        if (!reviewData) {
            res.status(404).json({ message: 'User not found.' });
            return;
        }

        res.status(200).json(reviewData);
    } catch (err) {
        res.status(500).json(err);
    }

});


// Edit a review
router.put('/:id', async (req, res) => {
    const reviewData = await Review.update(
        {
            content: req.body.content,
            rating: req.body.rating,
            user_id: req.body.user_id,
            book_id: req.body.book_id,
        },
        {
            where: {
                id: req.params.id,
            },
        }
    );

    return res.json(reviewData);
});

// DELETE a review
router.delete('/:id', async (req, res) => {
    try {
        const reviewData = await Review.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!reviewData) {
            res.status(404).json({ message: 'Review not found.' });
            return;
        }

        res.status(200).json(reviewData);
    } catch (err) {
        res.status(500).json(err);
    }
});





module.exports = router;