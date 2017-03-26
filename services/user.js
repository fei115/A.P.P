"use strict";

var User = require('../models/user.js');
var Post = require('../models/post.js');
var Book = require('../models/book.js');
var Rating = require('../models/rating.js');
var CommonService = require('./common.js');

/**
 * Returns the complete profile of a user 
 */
function myProfile(userId) {
	return CommonService.findById(User, userId);
}
/**
 *  Updates the user profile
 *  Only updates phone, first name and last name.
 */
function updateProfile(userId, profile) {
	var query = { _id: userId };
	var data = { phone: profile.phone };
	if (profile.firstname && profile.firstname.length > 0) 
		data.firstname = profile.firstname;
	if (profile.lastname && profile.lastname.length > 0)
		data.lastname = profile.lastname;
	return CommonService.findOneAndUpdate(User, query, data);
}

/**
 * Return the posts created by the user
 */
function myPosts(userId, status) {
	var query = Post.find({creator: userId});
	if (status) {
		query.where('status').equals(status);
	}
	return query
	.populate('book')
	.populate('exchanger', ['firstname', 'lastname'])
	.lean()
	.sort('-dateCreated')
	.exec()
	.then(function(posts) {
		return posts
	})
	.catch(function(err) {
		throw err;
	})
}

/**
 * Return the posts where the exchanger is user.
 */
function myExchanges(userId, status) {
	var query = Post.find({exchanger: userId});
	if (status) {
		query.where('status').equals(status);
	}
	return query
	.populate('book')
	.populate('creator', ['firstname', 'lastname'])
	.lean()
	.sort('-dateCreated')
	.exec()
	.then(function(posts) {
		return posts
	})
	.catch(function(err) {
		throw err;
	})
}

/**
 * Return the books added by the user.
 */
function myBooks(userId) {
	return Book
	.find({creator: userId})
	.lean()
	.sort('-dateAdded')
	.exec()
	.then(function(books) {
		return books
	})
	.catch(function(err) {
		throw err;
	})
}

/**
 * Return the posts in user's interest list
 */
function myInterests(userId) {
	return User
	.findById(userId)
	.populate('interests.post')
	.select('interests.post')
	.sort('-interests.dateAdded')
	.lean()
	.exec()
	.then(function(posts) {
		return posts
	})
	.catch(function(err) {
		throw err;
	})
}

/**
 * Update user's interests to `interests`
 */
function updateInterests(userId, interests) {
	var query = { _id: req.user.id };
	var data =  { interests: interests };
	return CommonService
	.findOneAndUpdate(User, query, data)
	.then(function(user) {
		return user.interests;
	})
	.catch(function(err) {
		throw err;
	})
}

/**
 * Add `postId` to user's interests
 * Does not add duplicates.
 */
function addInterest(userId, postId) {
	var query = { _id: userId, 'interests.post': {$ne: postId} }
	var update = {$push: {interests: { post: postId }}}
	return CommonService
	.findOneAndUpdate(User, query, update)
	.then(function(user) {
		return user.interests;
	})
	.catch(function(err) {
		throw err;
	})
}

/**
 * Delete `postId` from user's interests
 */
function deleteInterest(userId, postId) {
	var query = { _id: userId };
	var update = { $pull: { interests: { post: postId }}};
	return CommonService
	.findOneAndUpdate(User, query, update)
	.then(function(user) {
		return user.interests;
	})
	.catch(function(err) {
		throw err;
	})
}

/**
 * Return the profile of a user in visitor mode 
 */
function visitProfile(userId) {
	return User
	.findById(userId)
	.select('firstname lastname phone rating local.email facebook.email avatar')
	.lean()
	.exec()
	.then(function(user){
		return user;
	})
	.catch(function(err) {
		throw err;
	})
}

function rateUser(rater, rating) {
	if (rater === rating.ratee) {
		return Promise.reject(new Error("User cannot rate itself."));
	} else {
		var query = { rater: rater, ratee: rating.ratee };
		rating.rater = rater;
		var options = { upsert: true, new: true, runValidators: true };
		return CommonService.findOneAndUpdate(Rating, query, rating, options);
	}
}

module.exports = {
	myProfile,
	updateProfile,
	myPosts,
	myExchanges,
	myBooks,
	myInterests,
	updateInterests,
	addInterest,
	deleteInterest,
	visitProfile,
	rateUser
}