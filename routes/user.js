var express = require('express');
var router = express.Router();

var User = require('../models/user.js');
var Post = require('../models/post.js');
var Book = require('../models/book.js');
var Common = require('./common.js');


/**
 * Return the user profile
 */
 router.get('/user/profile', 
	function(req, res, next){ 
		req.params.id = req.user.id;
		next()
	}, 
	Common.loadDocument(User),
	function(req, res) {
		res.json(req.doc.toJSON())
	}
);

/**
 *  Updates the user profile
 */
router.post('/user/profile/update', function(req, res, next) {
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
router.get('/user/posts', function(req, res){
	var query = Post.find({creator: req.user.id});
	if(req.query.status)
		query.where('status').equals(req.query.status);
	query
	.populate('book')
	.populate('exchanger', ['firstname', 'lastname'])
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
	.populate('creator', ['firstname', 'lastname'])
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
router.get('/user/books', function(req, res ) {
	Book
	.find({creator: req.user.id})
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
router.get('/user/interests', function(req, res, next){
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
router.post('/user/interests/update', function(req, res, next){
	User.update(
		{ _id: req.user.id },
		{ interests: req.body.interests },
		function(err) {
			if (err) {
				return next(err);
			} else {
				res.json(req.body.interests);
			}
		}
	);
});

/**
 * Add the given post to user's interests
 * Does not add duplicates.
 */
router.post('/user/interests/add', function(req, res, next){
	User.findById(req.user.id, function(err, user) {
		if (err) {
			return next(err)
		} if (user.interests.some(function(e) { e.name == req.body.post; })) {
			return next(new Error('The selected post already exists'));
		} else {
			user.interests.push({ post: req.body.post })
			user.save(function(err, savedUser) {
				if (err) {
					return next(err);
				} else {
					return res.json(savedUser.interests);
				}
			})
		}
	})
});

/**
 * Delete the given post from user's interests
 */
router.post('/user/interests/delete', function(req, res, next){
	User.update( 
		{ _id : req.user.id },
		{ $pullAll: { 'interests.post' : [req.body.post] }},
		function(err) {
			return next(err);
		}
	);
});
			

router.get('/user/visit/profile/:id', function(req, res, next){
	User
	.findById(req.params.id)
	.select('firstname lastname phone rating local.email facebook.email')
	.lean()
	.exec(function(err, user) {
		if (err) {
			return next(err)
		} else {
			profile = {}
			profile.firstname = user.firstname;
			profile.lastname = user.lastname;
			profile.phone = user.phone;
			profile.rating = user.rating;
			profile.email = local.email || facebook.email;
			return res.json(profile);
		}
	});
});

module.exports = router;	