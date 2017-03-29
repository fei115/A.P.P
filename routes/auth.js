"use strict";

var express = require('express');
var router = express.Router();
var RouteUtil = require('./util.js');
var AuthService = require('../services/auth.js');
var passport = require('../middlewares/passport.js');

/**
 * Sign up as a local user through email
 */
router.put('/auth/signup/local', function(req, res, next){
	var verifyRoute = req.protocol + '://' + req.get('host') + '/api/auth/verify';
	var promise = AuthService.signup(req.body, verifyRoute);
	RouteUtil.respondAsJson(promise, res, next);
});

/**
 * Login an user using email and password.
 */
router.post('/auth/login/local', 
	passport.authenticate('local', { session: false }),
	verified,
    generateToken,
	respond
);

/**
 * Login an user using Facebook access_token
 * Creates a new user if this is the first time logging in.
 */
router.get('/auth/login/facebook',
	passport.authenticate('facebook-token'),
    generateToken,
	respond
);

/** 
 * Verify a local user 
 */
router.get('/auth/verify/:code', function(req, res, next) {
	AuthService.verify(req.params.code)
	.then(function() {
		return res.redirect('/verified.html');
	})
	.catch(function(err) {
		return res.redirect('/error.html');
	});
});
 
/** 
 * Send an confirmation email to newly registered local user.
 */
router.post('/auth/email/confirm',
	passport.authenticate('local', { session: false }),
	function(req, res, next) {
		var result = AuthService.sendEmailConfirmation(req.user);
		RouteUtil.respond(result, res, next);
});

/**
 * Check whether the local user has verified the email yet
 */
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

/**
 * Generate a JSON web token for the current user.
 */
function generateToken(req, res, next) {  
	req.token = AuthService.genJWToken(req.user.id);
	return next();
}

/**
 * Respond with token and user info
 */
function respond(req, res) {  
	return res.status(200).json({
		user: req.user,
		token: req.token
	});
}

module.exports = router;