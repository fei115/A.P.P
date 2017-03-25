"use strict";

var Post = require('../models/post.js')
var Report = require('../models/report.js')
var CommonService = require('./common.js');

/**
 * Create a new post
 */
function create(userId, data) {
	data.creator = userId;
	data.status = 'Open';
	return CommonService.create(Post, data);
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
	if (criteria.book) {
		var query = Post.find({
			book: criteria.book,
			status: 'Open'
		});
		if(criteria.type) 
			query.where('type').equals(criteria.type);
		return query
		.populate('book')
		.populate('creator', ['firstname', 'lastname'])
		.lean()
		.sort('-dateCreated')
		.exec()
		.then(function(posts) {
			return posts;
		})
		.catch(function(err) {
			throw err;
		});
	} else {
		return Promise.resolve([]);
	}
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
		if (count < 10) {
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

function deletePostAndReports(postId) {
	return CommonService.remove(Report, { post: postId })
	.then(function(obj) {
		return CommonService.remove(Post, { _id: postId });
	})
	.catch(function(err) {
		throw err;
	});
}

module.exports = {
	create,
	update,
	remove,
	search,
	report
}