"use strict";

var Book = require('../models/book.js')
var CommonService = require('./common.js');

/**
 * Update a book. It uses ISBN instead of _id as the identifier
 */
function update(userId, data) {
	var query = { creator: userId, isbn: data.isbn };
	return CommonService.findOneAndUpdate(Book, query, data);	
}

/**
 * Search a book, currently supports search via
 * 		1. title
 *		2. isbn
 *		3. course number
 */
function search(criteria) {
	if (criteria.isbn) { // by ISBN
		return Book.findByISBN(criteria.isbn);
	} else if (criteria.title) { // by title
		return Book.findByTitle(criteria.title);
	} else if (criteria.course) { // by course
		return Book.findByCourse(criteria.course);
	} else {
		return Promise.resolve();
	}
}

module.exports = {
	update,
	search
}