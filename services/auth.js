var User = require('../models/user.js');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var config = require('../config/config.js');

/**
 * Sign up through email/local
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
				"rating": 0,
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
 * generates a json web token for `userId`
 */
function genJWToken(userId) {
	return jwt.sign({ id: userId }, config.jwtSecretKey);
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
	genRandomString,
	hashPassword
}