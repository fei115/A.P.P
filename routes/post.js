var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); 
var Book = require('../models/book.js');
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
 * Create a new post
 */
router.post('/post/create', function(req, res, next){
	var post = new Post({
		"title": req.body.title,
		"description": req.body.description,
		"creator": req.body.creator,
		"book": req.body.book,
		"price": req.body.price,
		"condition": req.body.condition,
		// image
		"status": 'Open',
		"type": req.body.type,
		"exchanger": req.body.exchanger
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

module.exports = router;