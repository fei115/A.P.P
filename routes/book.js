var express = require('express');
var router = express.Router(); 
var Book = require('../models/book.js');
var RouteUtil = require('./util.js');
var BookService = require('../services/book.js');
var CommonService = require('../services/common.js');

/**
 * Get all books from the database
 */
router.get('/books', function(req, res, next) {
	var promise = CommonService.findAll(Book);
	RouteUtil.respondAsJson(promise, res, next);
});

/**
 * Get a book by 'id'
 */
router.get('/book/:id', function(req, res, next) {
	var promise = CommonService.findById(Book, req.params.id);
	RouteUtil.respondAsJson(promise, res, next);
});

/**
 * Create a new book
 */
router.put('/book/create', function(req, res, next){
	var data = {
		"title": req.body.title,
		"authors": req.body.authors,
		"isbn": req.body.isbn,
		"courses": req.body.courses,
		"creator": req.user.id,
		"thumbnail": req.body.thumbnail
	};
	var promise = CommonService.create(Book, data);
	RouteUtil.respondAsJson(promise, res, next);
});

/**
 * Search for book(s)
 */
router.get('/book/search/criteria', function(req, res, next){
	var criteria = {
		isbn: req.query.isbn,
		title: req.query.title,
		course: req.query.course
	}
	var promise = BookService.search(criteria)
	RouteUtil.respondAsJson(promise, res, next)
});

module.exports = router;