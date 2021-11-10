const router = require('express').Router();
const { Review, User } = require('../models');
const withAuth = require('../utils/auth');
const axios = require('axios')

// GET all reviews so they can be displayed on homepage
router.get('/', withAuth, async (req, res) => {
  try {
    // Get all projects and JOIN with user data
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

module.exports = router;
