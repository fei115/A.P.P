"use strict";

var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var User = require('../models/user.js');
var config = require('../config/config.js');
var MailService = require('./mail.js');

/**
 * Sign up using email
 */
function signup(profile) {
	return User
	.findOne({'local.email': profile.email})
	.then(function(existingUser) {
		if (existingUser) {
			throw new Error('Entered e-mail is already in use.');
		} else {
			/* Hash password */
			var salt = genRandomString(16);
			var passwordHash = hashPassword(profile.password, salt);
			var newUser = new User({
				"firstname": profile.firstname,
				"lastname": profile.lastname,
				"phone": profile.phone,
				"verified": true, // change it to false 
				"role": 'User',
				"interests": [],
				"local": {
					"email": profile.email,
					"password": passwordHash,
					"salt": salt
				},
				"avatar": profile.avatar
			});
			return newUser.save()
		}
	})
	.then(function(newUser) {
		return newUser.toJSON();
	})
	.catch(function(err) {
		throw err;
	});
}

/**
 * Send an confirmation code to the email of `locailUser`
 */
function sendEmailConfirmation(localUser) {
	if (localUser.verified) {
		return new Error('User already verified');
	} else if (!localUser.local || !localUser.local.email) {
		return new Error('User must be a `local` user');
	} else {
		var code = randomInt(10000, 100000);
		var mailOptions = {
			to: localUser.local.email,
			subject: 'EZTextbook Email Verification',
			html: '<b>' + code + '</b>' // html body
		};
		console.log('i am here');
		return MailService.sendMail(mailOptions);
	}
}

/**
 * generates a JSON web token for `userId`
 */
function genJWToken(userId) {
	return jwt.sign({ id: userId }, config.jwt.secretKey);
}

/**
 * generates random integer between low (inclusive) and high (exclusive)
 * @function
 * @param {integer} low - The lower bound
 * @param {integer} high - The upper bound
 */
function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
function genRandomString(length){
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0,length);   /** return required number of characters */
};

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
function hashPassword(password, salt){
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    return hash.digest('hex');
};

module.exports = {
	signup,
	sendEmailConfirmation,
	genJWToken,
	randomInt,
	genRandomString,
	hashPassword
}