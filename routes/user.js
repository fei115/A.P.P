var express = require('express');
var router = express.Router();
var User = require('../models/user.js')

/**
 * Get a user by 'id'
 */
router.get('/user/:id', function(req, res){
    res.send('The id you specified is ' + req.params.id);
});

/**
 * Get a user by 'id'
 */
router.post('/user/create', function(req, res){
	var user = new User({
		"name": req.body.name
	});
	user.save(function(err) {
		if (err) next(err);
		console.log("User Created Successfully");
		res.send(req.body);
	});
});

module.exports = router;