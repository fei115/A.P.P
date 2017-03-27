"use strict";

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
	req.body.creator = req.user.id;
	var promise = CommonService.create(Book, req.body);
	RouteUtil.respondAsJson(promise, res, next);
});

/**
 * Update book
 */
 router.post('/book/update', function(req, res, next) {
	var promise = BookService.update(req.user.id, req.body);
	RouteUtil.respondAsJson(promise, res, next);
});


/**
 * Search for book(s)
 */
router.get('/book/search/criteria', function(req, res, next){
	var promise = BookService.search(req.query)
	RouteUtil.respondAsJson(promise, res, next)
});

module.exports = router;