var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../models/user.js')
var Common = require('./common.js')

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
router.post('/user/create', function(req, res){
	var salt = genRandomString(16);
	var passwordHash = hashPassword(req.body.password, salt);
	
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
		if (err) 
			next(err);
		else
			console.log("User Created Successfully");
			res.send(doc.toObject());
	});
});

/* Password Hashing Functions */

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
var genRandomString = function(length){
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
var hashPassword = function(password, salt){
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    return hash.digest('hex');
};

module.exports = router;