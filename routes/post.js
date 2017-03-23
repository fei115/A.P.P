var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); 
var Post = require('../models/post.js');
var Report = require('../models/report.js');
var Common = require('./common.js')

/**
 * @deprecated Get all posts from the database
 */
router.get('/posts', function(req, res){
	Post
	.find()
	.lean()
	.populate('creator', ['firstname', 'lastname'])
	.exec(function(err, posts) {
		if(err) {
			return next(err);
		} else {
			return res.json(posts);
		}
	});
});

/**
 * Get a post by 'id'
 */
router.get('/post/:id', Common.loadDocument(Post), function(req, res){
	var doc = req.doc;
	res.json(doc.toJSON());
});

/**
 * Create a new post
 */
router.put('/post/create', function(req, res, next){
	var post = new Post({
		"title": req.body.title,
		"description": req.body.description,
		"creator": req.user.id,
		"book": req.body.book,
		"price": req.body.price,
		"condition": req.body.condition,
		"images": req.body.images,
		"status": 'Open',
		"type": req.body.type,
		"exchanger": req.body.exchanger,
		"dateCreated": Date.now()
	});
	console.log(post);
	post.save(function(err, doc) {
		if (err) {
			next(err);
		}
		else {
			console.log("Post Created Successfully");
			res.send(doc.toJSON());
		}
	});
});

/**
 * Update a post
 */
router.post('/post/update', function(req, res, next){
	var postModel = new Post(req.body);
	Post.findOneAndUpdate(
		{ _id: req.body._id || req.body.id, creator: req.user.id },
		postModel,
		{ new: true, runValidators: true },
		function(err, post) {
			if (err) {
				return next(err);
			} else if (!post) {
				return next(new Error('The given post does not exists.'));
			} else {
				res.json(post.toJSON());
			}
		}
	)
});

/**
 * 	Delete a post given id
 */
router.delete('/post/delete', function(req, res, next){
	Post.remove({ _id: req.body.id || req.body._id }, function(err, removed) {
		if (err) {
			return next(err);
		} if(removed.result.n == 0) {
			return next(new Error('The given post does not exists.'));
		} else {
			return res.json({success: true, message: 'Post successfully deleted'});
		}
	}); 
});

/**
 * Search for posts by specifying the following
 * 		1. Book object id
 *		2. [Optional] post type
 */
router.get('/post/search/criteria', function(req, res, next){
	if(req.query.book) {
		var query = Post.find({
			book: req.query.book,
			status: 'Open'
		});
		if(req.query.type) 
			query.where('type').equals(req.query.type);
		query
		.populate('book')
		.populate('creator', ['firstname', 'lastname'])
		.lean()
		.sort('-dateCreated')
		.exec(function(err, posts) {
			if (err) {
				return next(err);
			} else {
				return res.json(posts);
			}
		});
	} else {
		res.json();
	}
});


router.put('/post/report', function(req, res, next){
	Report
	.findOne({ reporter: req.user.id, post: req.body.post })
	.exec(function(err, prevReport) {
		if (err) {
			return next(err);
		} //else if (prevReport) {
			//return next(new Error('User reported post before.'));
		 else {
			var report = new Report({
				reporter: req.user.id,
				post: req.body.post,
				reason: req.body.reason || 'Spam'
			});
			console.log(report);
			report.save(function(err) {
				if (err) {
					next(err);
				} else {
					Report.count({ post: req.body.post}, function(err, count){
						if (err) {
							return next(err);
						} else if (count >= 10) {
							Report.remove({ post: req.body.post}, function(err) { 
								if (err) {
									return next(err)
								} else {
									Post.remove({ _id: req.body.post }, function(err) {
										if (err) {
											return next(err)
										} else {
											return res.json({ success: true });
										}
									});
								}
							});
						} else {
							console.log("Report Submitted");
							return res.json({ success: true });
						}
					});
				}
			});
		}
	});
});

module.exports = router;