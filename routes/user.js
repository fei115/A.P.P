var express = require('express');
var router = express.Router();
var passport = require('../middleware/auth.js');
var jwt = require('jsonwebtoken');

var User = require('../models/user.js');
var UserService = require('../services/user.js');
var Common = require('./common.js');
var config = require('../config/config.js');

/**
 * Get a user by 'id'
 */
router.get('/user/:id', Common.loadDocument(User), function(req, res){
	var doc = req.doc;
	res.json(doc.toJSON());
});

/**
 * Create a new user
 */
router.post('/user/create', function(req, res, next){
	var salt = UserService.genRandomString(16);
	var passwordHash = UserService.hashPassword(req.body.password, salt);
	
	var user = new User({
		"username": req.body.username,
		"password": passwordHash,
		"salt": salt,
		"name": req.body.name,
		"email": req.body.email,
		"phone": req.body.phone,
		"rating": 0,
		"role": req.body.role, // change it to 'User' after an admin is added
	});
	user.save(function(err, doc) {
		if (err) {
			next(err);
		}
		else {
			console.log("User Created Successfully");
			res.send(doc.toJSON());
		}
	});
});

/**
 * Login an user using userName and password.
 */
router.post('/user/login', 
	passport.authenticate('local', { session: false }),
    function(req, res) {
		var token = jwt.sign({ username: req.user.username }, config.jwtSecretKey);
		res.status(200).json({
			user: req.user,
			token: token
		});
});

module.exports = router;