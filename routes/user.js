var express = require('express');
var router = express.Router();

var User = require('../models/user.js');
var Post = require('../models/post.js');
var Book = require('../models/book.js');
var RouteUtil = require('./util.js');

var BookService = require('../services/book.js');
var UserService = require('../services/user.js');
var CommonService = require('../services/common.js');


/**
 * Return the user profile
 */
 router.get('/user/profile', function(req, res, next) { 
	var promise = CommonService.findById(User, req.user.id);
	RouteUtil.respondAsJson(promise, res, next);
});

/**
 *  Updates the user profile
 */
router.post('/user/profile/update', function(req, res, next) {
	var promise = UserService.updateProfile(req.user.id, req.body);
	RouteUtil.respondAsJson(promise, res, next);
});

/**
 * Return the posts created by the user
 */
router.get('/user/posts', function(req, res, next) {
	var promise = UserService.myPosts(req.user.id, req.query.status);
	RouteUtil.respondAsJson(promise, res, next);
});

/**
 * Return the posts where the exchanger is user.
 */
router.get('/user/exchanges', function(req, res, next) {
	var promise = UserService.myExchanges(req.user.id, req.query.status);
	RouteUtil.respondAsJson(promise, res, next);
});

/**
 * Return the books added by the user.
 */
router.get('/user/books', function(req, res, next) {
	var promise = UserService.myBooks(req.user.id);
	RouteUtil.respondAsJson(promise, res, next);
});

/**
 * Return the posts in user's interest list
 */
router.get('/user/interests', function(req, res, next){
	var promise = UserService.myInterests(req.user.id);
	RouteUtil.respondAsJson(promise, res, next);
});

/**
 * Update user's interests to the given list
 */
router.post('/user/interests/update', function(req, res, next){
	var promise = UserService.updateInterests(req.user.id, req.body.interests);
	RouteUtil.respondAsJson(promise, res, next);
});

/**
 * Add the given post to user's interests
 */
router.post('/user/interests/add', function(req, res, next){
	var promise = UserService.addInterst(req.user.id, req.body.post);
	RouteUtil.respondAsJson(promise, res, next);
});

/**
 * Delete the given post from user's interests
 */
router.post('/user/interests/delete', function(req, res, next){
	User.update( 
		{ _id : req.user.id },
		{ $pullAll: { 'interests.post' : [req.body.post] }},
		function(err) {
			return next(err);
		}
	);
});
			

router.get('/user/visit/profile/:id', function(req, res, next){
	User
	.findById(req.params.id)
	.select('firstname lastname phone rating local.email facebook.email')
	.lean()
	.exec(function(err, user) {
		if (err) {
			return next(err)
		} else {
			profile = {}
			profile.firstname = user.firstname;
			profile.lastname = user.lastname;
			profile.phone = user.phone;
			profile.rating = user.rating;
			profile.email = local.email || facebook.email;
			return res.json(profile);
		}
	});
});

module.exports = router;	