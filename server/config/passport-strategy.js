let LocalStrategy = require('passport-local').Strategy;
let models = require('../app/models');
let config = require('../config');

let options = {
  usernameField: 'email',
  passwordField: 'password'
};

function callback(email, password, done) {
  models.User.find({where: {email: email, confirmed: true}})
    .then(function (user, err) {
      if(!user) return done(null, err);

      if( models.User.hashPassword(password, config.authentication.secrets.password) !== user.passwordHash ) {
        return done(null, false, {message: 'Password or email is incorrect'});
      }

      return done(null, user);
    });
}

module.exports = function () {
  return new LocalStrategy(options, callback);
};