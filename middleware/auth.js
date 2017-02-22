var User = require('../models/user.js');
var UserService = require('../services/user.js');

var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({username: username}, function(err, user) {
            if (err)
                return done(err);
            else if (!user)
                return done(null, false, {
                    message: 'Incorrect username.'
                });
            else if (!user.validPassword( UserService.hashPassword(password, user.salt)) )
                return done(null, false, {
                    message: 'Incorrect password.'
                });
            else
                return done(null, user);
        });
    }
));

module.exports = passport; 