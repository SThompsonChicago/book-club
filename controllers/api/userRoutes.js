const router = require('express').Router();
const { User } = require('../../models');

router.post('/signup', async (req, res) => {
  try {
    const userData = await User.create({
      email: req.body.email,
      password: req.body.password,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
    });
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// CREATE a new user
// router.post('/signup', async (req, res) => {
//   try {
//     console.log('api signup hit')

//     const newUser = await User.create({
//       email: req.body.email,
//       password: req.body.password,
//       first_name: req.body.first_name,
//       last_name: req.body.last_name,
//     });

//     // set up sessions with a 'logged_in' variable set to 'true'
//     req.session.save(() => {
//       req.session.logged_in = true;

//       res.status(200).json(newUser);
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// GET all users
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
    });
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//user login
router.post('/login', async (req, res) => {
  try {
    console.log('api login hit')
    // Find the user who matches the posted e-mail address
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      console.log('incorrect email')
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    console.log('email passed')
    // Verify the posted password with the password store in the database
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      console.log('password fail')
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    console.log('password passed')

    // Create session variables based on the logged in user
    req.session.save(() => {
      console.log('session save iniated')
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      //REMOVE COMPLETE USERDATA--only send what you need
      console.log('sending back success')
      res.json({ user: userData, message: `User is now logged in.` });
    });

  } catch (err) {
    console.log('there\'s been an error')
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    // Remove the session variables
    req.session.destroy(() => {
      res.status(204).end();
      console.log('You are now logged out.')
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;