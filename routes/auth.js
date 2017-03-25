"use strict";

var express = require('express');
var router = express.Router();
var RouteUtil = require('./util.js');
var AuthService = require('../services/auth.js');
var passport = require('../middlewares/passport.js');

/**
 * Sign up through email/local
 */
router.put('/auth/signup/local', function(req, res, next){
	var promise = AuthService.signup(req.body);
	RouteUtil.respondAsJson(promise, res, next);
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
 * Login an user using Facebook access_token
 * It will create an user in the database, if this is first time.
 */
router.get('/auth/login/facebook',
	passport.authenticate('facebook-token'),
    generateToken,
	respond
);
 
/**
 * Send confirmation email
 */
router.post('/auth/email/confirm',
	passport.authenticate('local', { session: false }),
	function(req, res, next) {
		var result = AuthService.sendEmailConfirmation(req.user);
		console.log(result);
		RouteUtil.respond(result, res, next);
});

function generateToken(req, res, next) {  
	req.token = AuthService.genJWToken(req.user.id);
	return next();
}

function respond(req, res) {  
	return res.status(200).json({
		user: req.user,
		token: req.token
	});
}

function verified(req, res, next) {
	if(req.user.verified) {
		return next()
	} else {
		return res.status(401).json({
			success: false,
			message: "E-mail verification is required."
		});
	}
}

module.exports = router;