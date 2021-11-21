const withAuth = (req, res, next) => {
  // If the user isn't logged in, redirect them to the login route
  if (!req.session.logged_in) {
    console.log('You are not yet logged in');
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;
