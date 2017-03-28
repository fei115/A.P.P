"use strict";

var Post = require('../models/post.js')
var User = require('../models/user.js')
var Report = require('../models/report.js')
var CommonService = require('./common.js');

/**
 * Find all posts
 */
function findAll(type) {
	return search({ type: type });
}

/**
 * Find the post using postId
 */
function findById(postId) {
	Post
	.findById(postId)
	.populate('book')
	.lean()
	.exec()
	.then(function(book) {
		return book;
	})
	.catch(function(err) {
		throw err;
	});
}

/**
 * Create a new post
 * Increases the user rating by 1.
 */
function create(userId, data) {
	data.creator = userId;
	data.status = 'Open';
	return CommonService
	.create(Post, data)
	.then(function(post) {
		return CommonService
		.findById(User, userId, {json: false})
		.then(function(user) {
			return user.increaseRating(1);
		})
		.then(function(obj) {
			return post;
		})
	})
	.then(function(post) {
		return post;
	})
	.catch(function(err) {
		throw err;
	});
}

/**
 * Update a post
 */
function update(userId, data) {
	var query = { _id : data._id, creator: userId };
	return CommonService.findOneAndUpdate(Post, query, data);
}

/**
 * 	Delete a post
 */
function remove(userId, postId) {
	var query = { _id: postId, creator: userId }
	return CommonService.remove(Post, query);
}

/**
 * Search posts by specifying the following
 * 		1. Book object id
 *		2. [Optional] post type
 */
function search(criteria) {
	var query = { status: 'Open' };
	if (criteria.status)
		query.status = criteria.status;
	if (criteria.type)
		query.type = criteria.type;
	if (criteria.book)
		query.book = criteria.book;
	return Post
	.find(query)
	.populate('book')
	.populate('creator', ['firstname', 'lastname', 'rating'])
	.lean()
	.sort('-dateCreated')
	.exec()
	.then(function(posts) {
		return posts;
	})
	.catch(function(err) {
		throw err;
	})
}

/**
 * Report a post.
 *   - creates a report associated with the post
 *   - user can only report a post once
 *   - number of reports for the post >= 10, delete the post
 */
function report(userId, data) {
	return Report
	.findOne({ reporter: userId, post: data.post })
	.then(function(prevReport) {
		if (prevReport) {
			throw new Error('User reported post before.');
		} else {
			return Report.count({ post: data.post });
		}
	})
	.then(function(count) {
		if (count < 9) {
			var newReport = {
				reporter: userId,
				post: data.post,
				reason: data.reason || 'Spam'
			};
			return CommonService.create(Report, newReport);
		} else {
			console.log("Spam count reach 10. Delete Post!!")
			return deletePostAndReports(data.post)
		}
	})
	.then(function(obj) {
		return { success: true, message: 'Report Submitted.' }
	})
	.catch(function(err) {
			throw err;
	});
}

/**
 * Delete a post and its associated reports
 * Reduces the rating of post creator by 30
 */
function deletePostAndReports(postId) {
	return CommonService
	.remove(Report, { post: postId }) // delete related reports
	.then(function(obj) { // delete the post itself
		return Post.findOneAndRemove({ _id: postId }).exec();
	})
	.then(function(post) { // find user
		return CommonService.findById(User, post.creator, {json: false})
	})
	.then(function(user) { // decrease user rating
		return user.decreaseRating(100);
	})
	.catch(function(err) {
		throw err;
	});
}

module.exports = {
	findAll,
	findById,
	create,
	update,
	remove,
	search,
	report
}