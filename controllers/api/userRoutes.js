const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// CREATE a new user
router.post('/signup', async (req, res) => {
  try {
    const newUser = await User.create({
      email: req.body.email,
      password: req.body.password,
      first_name: req.body.first_name,
      last_name: req.body.last_name
    });

    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.email = newUser.email;
      req.session.first_name = newUser.first_name;
      req.session.last_name = newUser.last_name;
      req.session.loggedIn = true;

      res.json(newUser);
    });
  } catch (err) {
    res.status(500).json(err);
  }
}); 

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
      console.log('session saved iniated')
      req.session.user_id = userData.id;
      req.session.logged_in = true;
        //REMOVE COMPLETE USERDATA--only send what you need
        console.log('sending back success')
      res.json({ user: userData, message: `Login status is ${req.session.logged_in} for user with id ${req.session.user_id}!`});
    });

  } catch (err) {
    console.log('theres been an error')
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