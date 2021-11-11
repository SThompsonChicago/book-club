const router = require('express').Router();
const { Review, User } = require('../models');
const withAuth = require('../utils/auth');
const axios = require('axios')

// GET all reviews so they can be displayed on homepage
router.get('/', withAuth, async (req, res) => {
  try {
    // Get all reviews and JOIN with user data
    const reviewData = await Review.findAll({
      include: [
        {
          model: User,
          attributes: ['first_name', 'last_name'],
        },
      ],
    });

    

    // Serialize data so the template can read it
    const reviews = reviewData.map((review) => review.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      reviews, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    console.log('You are logged in.');
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/test', (req, res) => res.render('testRealm'))


router.get('/test/:bookToSearch', async (req, res)=> {
  let bookToSearch = req.params.bookToSearch;
  try {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${bookToSearch}&key=AIzaSyA-hqQjqpuIodg2ouHkE0ZWaQehBv4DCF8`);
    console.log(response.data);
    res.render('byTitle', {data: response.data});
  

  } catch(err) {
    res.status(400).render('err', {err});
  }
})

router.get('/new-review', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Review }],
    });

    const user = userData.get({ plain: true });

    res.render('new-review', {
      ...user,
      logged_in: true
    });
   } catch (err) {
      res.status(500).json(err);
    }
});

router.get('/new-review/:book_id', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Review}],
    });

    const user = userData.get({ plain: true });
    const book_id = req.params.book_id;

    res.render('new-review', {
      ...user,
      book_id,
      logged_in: true
    });
   } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;