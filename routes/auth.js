var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../models/user.js');
var AuthService = require('../services/auth.js');
var config = require('../config/config.js');
var passport = require('../middleware/passport.js');


/**
 * Sign up through email/local
 */
router.put('/auth/signup/local', function(req, res, next){
	User.findOne({'local.email': req.body.email}, function(err, user) {
		if (err)
            return next(err);
        else if (user)
			return next(new Error('Entered e-mail is already in use.'));
		else {
			/* Hash password */
			var salt = AuthService.genRandomString(16);
			var passwordHash = AuthService.hashPassword(req.body.password, salt);
			/* Create a new User */
			var newUser = new User({
				"firstname": req.body.firstname,
				"lastname": req.body.lastname,
				"phone": req.body.phone,
				"rating": 0,
				"verified": true, // change it to false 
				"role": req.body.role, // change it to 'User' after an admin is added
				"interests": [],
				"local": {
					"email": req.body.email,
					"password": passwordHash,
					"salt": salt
				}
			});
			/* Save new user into database */
			newUser.save(function(err, doc) {
				if (err)
					return next(err);
				else 
					res.send(doc.toJSON());
			});
		}
	});
});

/**
 * Login an user using userName and password.
 */
router.post('/auth/login/local', 
	passport.authenticate('local', { session: false }),
	verified,
    generateToken,
	respond
);

/**
 * Login an user using Facebook
 * It will create an user in the database, if this is first time.
 */
router.get('/auth/login/facebook', 
	passport.authenticate('facebook', { scope : 'email', session : false }),
	generateToken
);
 

/**
 * Facebook login callback
 */
router.get('/auth/login/facebook/callback',
	passport.authenticate('facebook', {
		successRedirect : '/user/profile',
		failureRedirect : '/'
    })
);

/**
 * Logout an user
 * No server-side invalidation, client should simply delete the token from
 * the device.  Server could have a jwt-black list in the db, but this may impede 
 * performance.
 */
 

function generateToken(req, res, next) {  
	req.token = jwt.sign({ id: req.user.id }, config.jwtSecretKey);
	return next();
}

function respond(req, res) {  
	res.status(200).json({
		user: req.user,
		token: req.token
	});
}

function verified(req, res, next) {
	if(req.user.verified)
		return next()
	else
		res.status(401).json({
			success: false,
			message: "E-mail verification is required."
		});
}

module.exports = router;