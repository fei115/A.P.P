"use strict";

var User = require('../models/user.js');
var AuthService = require('../services/auth.js');
var config = require('../config/config.js');
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var FacebookTokenStrategy = require('passport-facebook-token');

/* Local Strategy */
passport.use(new LocalStrategy({
		usernameField: 'email'
	},
    function(email, password, done) {
        User.findOne({'local.email': email}, function(err, user) {
            if (err)
                return done(err);
            else if (!user)
                return done(null, false, {
					success: false,
                    message: 'Incorrect email.'
                });
            else if (!user.validPassword( AuthService.hashString(password, user.local.salt)))
                return done(null, false, {
					success: false,
                    message: 'Incorrect password.'
                });
            else
                return done(null, user);
        });
    }
));

/* Facebook access token Strategy */
passport.use(new FacebookTokenStrategy({
        clientID: config.facebook.appID,
        clientSecret: config.facebook.appSecret,
    },
    function (accessToken, refreshToken, profile, done) {
        User.findOne({ 'facebook.id': profile.id }, function (err, user) {
            if (err) {
                return done(err);
            } else if (user) { // user found, update info 
                var update = {
                    "firstname": profile.name.givenName,
                    "lastname": profile.name.familyName,
                    "facebook.token": accessToken,
                    "avatar": profile.photos[0].value
                };
                var options = { new: true };
                User.findByIdAndUpdate(user.id, update, options, function (err, updatedUser) {
                    return done(err, updatedUser);
                })
            } else { // user not found, create an account for it.
                var userData = new User({
                    "firstname": profile.name.givenName,
                    "lastname": profile.name.familyName,
                    "verified": true,
                    "role": 'User',
                    "facebook": {
                        "id": profile.id,
                        "token": accessToken,
                        "email": profile.emails[0].value  // TODO: not all fb users have emails: phone#, email not verified etc
                    },
					"avatar": profile.photo[0].value
                });
                userData.save(function (err, newUser) {
                    return done(err, newUser);
                });
            }
        });
    }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = passport;