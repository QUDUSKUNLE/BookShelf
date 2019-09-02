const LocalStrategy = require('passport-local').Strategy;
const Users = require('../models/Users');


module.exports = (passport) => {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  },
  function(email, password, done) {
    Users.findOne({ email }, (err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false, { message: 'Unknown User' });
      if (!user.isValidPassword(password)) return done(null, false, 'Unauthorized user');
      return done(null, user)
    });
  }));

  passport.serializeUser(function (user, done) {
    done(null, user);
    return next();
  });

  passport.deserializeUser(function (email, done) {
    Users.findOne({ email: email }, function (err, user) {
      done(err, user);
    });
  });
}

