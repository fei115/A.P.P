var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); 
var Book = require('../models/book.js')
var Common = require('./common.js')

/**
 * Get all books from the database
 */
router.get('/books', function(req, res){
	Book
	.find()
	.lean()
	.exec(function(err, books) {
		if(err) {
			return next(err);
		} else {
			return res.json(books);
		}
	});
});

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
router.put('/book/create', function(req, res, next){
	var book = new Book({
		"title": req.body.title,
		"authors": req.body.authors,
		"isbn": req.body.isbn,
		"courses": req.body.courses,
		"creator": req.user.id,
		"thumbnail": req.body.thumbnail
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
 * Search a book, currently supports search via
 * 		1. title
 *		2. isbn
 *		3. course number
 */
router.get('/book/search/criteria', function(req, res, next){
	var callback = function(err, results) {
		if (err) 
			next(err);
		else 
			res.json(results);
	}
	if (req.query.isbn) { // by ISBN
		Book.findByISBN(req.query.isbn, callback);
	} else if (req.query.title) { // by title
		Book.findByTitle(req.query.title, callback);
	} else if (req.query.course) { // by course
		Book.findByCourse(req.query.course, callback);
	} else {
		res.json();
	}
});

module.exports = router;