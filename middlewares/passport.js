var User = require('../models/user.js');
var AuthService = require('../services/auth.js');
var fbConfig = require('../config/fb.js');

var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
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
            else if (!user.validPassword( AuthService.hashPassword(password, user.local.salt)) )
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
    clientID: fbConfig.appID,
    clientSecret: fbConfig.appSecret,
  }, 
  function(accessToken, refreshToken, profile, done) {
		var query = { 'facebook.id' : profile.id };
		var update = new User({
			"firstname": profile.name.givenName,
			"lastname": profile.name.familyName,
			"rating": 0,
			"verified": true, 
			"role": 'User',
			"facebook": {
				"id": profile.id,
				"token": access_token
				//"email": profile.emails[0].value  // Facebook API is not returning email for some reason, added github issue
			}
		});
		var options = { upsert: true, new: true, setDefaultsOnInsert: true };
		User.findOneAndUpdate(query, update, options, function(error, user) {
			return done(error, user);
		});
	
}));

/* Facebook Strategy */
passport.use('facebook', new FacebookStrategy({
  clientID        : fbConfig.appID,
  clientSecret    : fbConfig.appSecret,
  callbackURL     : fbConfig.callbackUrl,
  profileFields: ["id", "birthday", "email", "first_name", "last_name", "gender", "picture.width(200).height(200)"],
},
 
  // facebook will send back the tokens and profile
  function(access_token, refresh_token, profile, done) {
    // asynchronous
    process.nextTick(function() {
		
      // find the user in the database based on their facebook id
      User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
 
        // if there is an error, stop everything and return that
        // ie an error connecting to the database
        if (err)
          return done(err);
 
          // if the user is found, then log them in
          if (user) {
            return done(null, user); // user found, return that user
          } else {
            // if there is no user found with that facebook id, create them
			var newUser = new User({
				"firstname": profile.name.givenName,
				"lastname": profile.name.familyName,
				"rating": 0,
				"verified": true, 
				"role": 'User',
				"facebook": {
					"id": profile.id,
					"token": access_token
					//"email": profile.emails[0].value  // Facebook API is not return email for some reason, added github issue
				}
			});
			
            // save our user to the database
            newUser.save(function(err) {
              if (err)
                return done(err);
 
              // if successful, return the new user
              return done(null, newUser);
            });
         } 
      });
    });
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = passport;