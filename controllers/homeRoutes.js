const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');
const axios = require('axios')

// Prevent non logged in users from viewing the homepage
router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    const users = userData.map((project) => project.get({ plain: true }));

    res.render('homepage', {
      users,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
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
