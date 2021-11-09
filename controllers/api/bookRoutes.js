const router = require('express').Router();
const { Book } = require('../../models');
const withAuth = require('../../utils/auth');

// CREATE new book
router.post('/', withAuth, async (req, res) => {
    const body = req.body;
    try {
        const newBook = await Book.create({
            title: req.body.title,
            author: req.body.author,
            isbn: req.body.isbn,
            genre: req.body.genre
        });
        res.status(200).json(newBook);
    } catch (err) {
        res.status(400).json(err);
    }
});

// GET all books
router.get('/', async (req, res) => {
    try {
        const bookData = await Book.findAll({
            include: [{ model: Review }],
        });
        res.status(200).json(bookData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET particular book
router.get('/id', async (req, res) => {
    try {
        const bookData = await Book.findByPk(req.params.id, {
            include: [{ model: Review }],
        });

        if (!bookData) {
            res.status(404).json({ message: 'Book not found.'});
            return;
        }
        res.status(200).json(bookData);
    } catch(err) {
        res.status(500).json(err);
    }
});

// DELETE a book
router.delete('/:id', async (req, res) => {
    try {
        const bookData = await Book.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!bookData) {
            res.status(404).json({ message: 'Book not found.'});
            return;
        }

        res.status(200).json(bookData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;



