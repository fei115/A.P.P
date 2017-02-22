var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); 
var Book = require('../models/book.js')
var Common = require('./common.js')

/**
 * Get a book by 'id'
 */
router.get('/book/:id', Common.loadDocument(Book), function(req, res){
	var doc = req.doc;
	res.json(doc.toJSON());
});

/**
 * Create a new book
 */
router.post('/book/create', function(req, res, next){
	var book = new Book({
		"title": req.body.title,
		"authors": req.body.authors,
		"isbn": req.body.isbn,
		"publishedDate": req.body.date || Date(),
		"publisher": req.body.publisher
	});
	book.save(function(err, doc) {
		if (err) {
			next(err);
		}
		else { 
			console.log("Book Created Successfully");
			res.send(doc.toJSON());
		}
	});
});

/**
 * Search a book
 * Currently, supports find by ISBN or title+author
 */
//router.post('/book/search')

module.exports = router;