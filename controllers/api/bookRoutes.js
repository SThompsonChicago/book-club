const router = require('express').Router();
const { User, Book, Review } = require('../../models');
const withAuth = require('../../utils/auth');

// CREATE new book
router.post('/', async (req, res) => {
    try {
        const bookData = await Book.create(req.body);
        res.status(200).json(bookData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// GET all books
router.get('/', async (req, res) => {
    try {
        const bookData = await Book.findAll({
        });
        res.status(200).json(bookData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET particular book by id
router.get('/:id', async (req, res) => {
    try {
        const bookData = await Book.findByPk(req.params.id);

        if (!bookData) {
            res.status(404).json({ message: 'Book not found.'});
            return;
        }
        res.status(200).json(bookData);
    } catch(err) {
        res.status(500).json(err);
    }
});


module.exports = router;
