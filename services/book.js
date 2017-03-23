var Book = require('../models/book.js')

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
	search
}