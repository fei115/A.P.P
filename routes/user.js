var express = require('express');
var router = express.Router();

var User = require('../models/user.js');
var Post = require('../models/post.js');
var Book = require('../models/book.js');
var Common = require('./common.js');

/**
 * Get a user by 'id'
 
router.get('/user/:id', Common.loadDocument(User), function(req, res){
	var doc = req.doc;
	res.json(doc.toJSON());
});
*/

/**
 * Return the user given user id.
 */
 router.get('/user/profile', function(req, res, next){ 
	req.params.id = req.user.id;
	next()
},	Common.loadDocument(User),
	function(req, res){
		res.json(req.doc.toJSON());
});

router.post('/user/profile/update', function(req, res, next) {
	console.log(req.user.id)
	User.findOneAndUpdate(
		{ _id: req.user.id },
		{ phone: req.body.phone },
		{ new: true, runValidators: true },
		function(err, user) {
			if (err) {
				return next(err);
			} else {
				res.json(user.toJSON());
			}
		}
	)
});

/**
 * Return the posts created by the user
 */
router.get('/user/posts', function(req, res) {
	var query = Post.find({creator: req.user.id});
	if(req.query.status)
		query.where('status').equals(req.query.status);
	query
	.populate('book')
	.populate('exchanger')
	.lean()
	.sort('-dateCreated')
	.exec(function(err, posts) {
		if(err) {
			return next(err);
		} else {
			res.json(posts);
		}
	});
});

/**
 * Return the posts where the exchanger is user.
 */
router.get('/user/exchanges', function(req, res) {
	var query = Post.find({exchanger: req.user.id});
	if(req.query.status)
		query.where('status').equals(req.query.status);
	query
	.populate('book')
	.populate('creator')
	.lean()
	.sort('-dateCreated')
	.exec(function(err, posts) {
		if(err) {
			return next(err);
		} else {
			res.json(posts);
		}
	});
});

/**
 * Return the books added by the user.
 */
router.get('/user/books', function(req, res) {
	var query = Book.find({creator: req.user.id});
	query
	.lean()
	.sort('-dateAdded')
	.exec(function(err, books) {
		if (err) {
			return next(err);
		} else {
			res.json(books);
		}
	});
});

/**
 * Return the posts in user's interest list
 */
router.get('/user/interests', function(req, res) {
	User
	.findById(req.user.id)
	.populate('interests.post')
	.select('interests.post')
	.sort('-interests.dateAdded')
	.lean()
	.exec(function(err, user) {
		if(err) {
			return next(err);
		} else {
			res.json(user.interests);
		}
	});
});

/**
 * Update user's interests to the given list
 */
router.post('/user/interests/update', function(req, res){
	User.findOneAndUpdate(
		{ _id: req.user.id },
		{ interests: req.body.interests },
		{ new: true, runValidators: true },
		function(err, user) {
			if (err) {
				return next(err);
			} else {
				res.json(user.toJSON());
			}
		}
	)
});


/**
 * Add the given post to user's interests
 * Does not add duplicates.
 */
router.post('/user/interests/add', function(req, res){
	User
	.findById(req.user.id)
	.populate('interests.post')
	.select('interests.post')
	.sort('-interests.dateAdded')
	.lean()
	.exec(function(err, user) {
		if(err) {
			next(err);
		} else {
			res.json(user.interests);
		}
	});
});

/**
 * Delete the given post from user's interests
 */
router.post('/user/interests/add', function(req, res){
	User
	.findById(req.user.id)
	.populate('interests.post')
	.select('interests.post')
	.sort('-interests.dateAdded')
	.lean()
	.exec(function(err, user) {
		if(err) {
			next(err);
		} else {
			res.json(user.interests);
		}
	});
});

router.get('/user/visit/profile/:id', function(req, res){
	User
	.findById(req.params.id)
	.select('firstname lastname phone rating local.email facebook.email')
});


module.exports = router;	