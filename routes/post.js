var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); 
var Post = require('../models/post.js');
var Common = require('./common.js')

/**
 * Get a post by 'id'
 */
router.get('/post/:id', Common.loadDocument(Post), function(req, res){
	var doc = req.doc;
	res.json(doc.toJSON());
});

/**
 * @deprecated Get all posts from the database
 */
router.get('/posts', function(req, res){
	Post
	.find()
	.lean()
	.exec(function(err, posts) {
		if(err) {
			return next(err);
		} else {
			return res.json(posts);
		}
	});
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
		// image
		"status": 'Open',
		"type": req.body.type,
		"exchanger": req.body.exchanger,
		"dateCreated": Date()
	});
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

router.post('/post/update', Common.loadDocument(Post), function(req, res, next)){
	
	
	
	
}

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
		.populate('creator')
		.lean()
		.sort('-dateCreated')
		.exec(function(err, posts) {
			if(err) {
				next(err);
			} else {
				res.json(posts);
			}
		});
	} else {
		res.json();
	}
}) 


module.exports = router;