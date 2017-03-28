"use strict";

var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var User = require('../models/user.js');
var Verification = require('../models/verification.js');
var config = require('../config/config.js');
var MailService = require('./mail.js');

/**
 * Sign up through email/local
 */
function signup(profile, hostPath) {
	var newUser;
	return User
	.findOne({'local.email': profile.email})
	.then(function(existingUser) {
		if (existingUser) {
			throw new Error('Entered e-mail is already in use.');
		} else {
			/* Hash password */
			var salt = genRandomString(16);
			var passwordHash = hashString(profile.password, salt);
			var user = new User({
				"firstname": profile.firstname,
				"lastname": profile.lastname,
				"phone": profile.phone,
				"verified": false,
				"role": 'User',
				"interests": [],
				"local": {
					"email": profile.email,
					"password": passwordHash,
					"salt": salt
				},
				"avatar": profile.avatar
			});
			return user.save()
		}
	})
	.then(function(user) {
		newUser = user.toJSON();
		return newUser;
	})
	.then(function(user) {
		return createVerification(user);
	})
	.then(function(verification) {
		sendEmailConfirmation(newUser, verification, hostPath);
		return newUser;
	})
	.catch(function(err) {
		throw err;
	});
}

function verify(code) {
	console.log(code);
	return Verification
	.findOne({ code: code })
	.populate('user')
	.exec()
	.then(function(verification) {
		if (!verification) {
			throw new Error('Unable to verify the email address');
		} else {
			var  user = verification.user
			user.verified = true;
			return user.save();
		}
	})
	.then(function(user) {
		return Verification.remove({ code: code });
	})
	.then(function(obj) {
		return { success: true, message: 'E-mail verified' };
	})
	.catch(function(err) {
		throw err;
	});
}


/**
 * Send an confirmation email to verify the email address of `localUser`.
 */
function sendEmailConfirmation(localUser, verification, hostPath) {
	if (localUser.verified) {
		return new Error('User already verified');
	} else if (!localUser.local || !localUser.local.email) {
		return new Error('User must be a `local` user');
	} else {
		var mailOptions = {
			to: localUser.local.email,
			subject: 'EZTextbook Email Verification',
			html: html(localUser, verification.code, hostPath)
		};
		return MailService.sendMail(mailOptions);
	}
}

/**
 * Creates a verification for new user.
 */
function createVerification(newUser) {
	var salt = genRandomString(10);
	var code = hashString(newUser._id.toString(), salt);
	var verification = Verification({
		user: newUser._id,
		code: code
	});
	return verification.save();
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
 * hash string 'str' with sha512.
 * @function
 * @param {string} str - The string to be hashed
 * @param {string} salt - Data used to hash 'str'
 */
function hashString(str, salt){
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(str);
    return hash.digest('hex');
};

/**
 * Hard coded email template... please use an template engine 
 */ 
function html(user, code, hostPath) { 
	return '<div class="PlainText">Dear ' + user.firstname + ' <br> <br>' +
		   'Verify that you own ' + user.local.email + ' <br> <br>' +
		   '<a href="' + hostPath + '/' + code + '" target="_blank">' +  'Confirm'  + '</a> <br> <br>' +
		   'Once verified, please via our app. <br> <br>' +
		   'Best regards, <br>' +
		   'EZTextbook Team'
}

module.exports = {
	signup,
	verify,
	sendEmailConfirmation,
	genJWToken,
	randomInt,
	genRandomString,
	hashString
}