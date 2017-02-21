var express = require('express');
var router = express.Router();
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
	var user = new User({
		"name": req.body.name
	});
	user.save(function(err, doc) {
		if (err) 
			next(err);
		else
			console.log("User Created Successfully");
			res.send(doc.toObject());
	});
});

module.exports = router;