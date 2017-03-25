"use strict";

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); 
var Post = require('../models/post.js');
var RouteUtil = require('./util.js');
var PostService = require('../services/post.js');
var CommonService = require('../services/common.js');

/**
 * Get all posts from the database
 */
router.get('/posts', function(req, res, next) {
	var promise = PostService.findAll(req.query.type);
	RouteUtil.respondAsJson(promise, res, next);
});

/**
 * Get a post by 'id'
 */
router.get('/post/:id', function(req, res, next) {
	var promise = CommonService.findById(Post, req.params.id);
	RouteUtil.respondAsJson(promise, res, next);
});

/**
 * Create a new post
 */
router.put('/post/create', function(req, res, next) {
	var promise = PostService.create(req.user.id, req.body);
	RouteUtil.respondAsJson(promise, res, next);
});

/**
 * Update a post
 */
router.post('/post/update', function(req, res, next) {
	var promise = PostService.update(req.user.id, req.body);
	RouteUtil.respondAsJson(promise, res, next);
});

/**
 * 	Delete a post given id
 */
router.delete('/post/delete', function(req, res, next) {
	var promise = PostService.remove(req.user.id, req.body.post);
	RouteUtil.respondAsJson(promise, res, next);
});

/**
 * Search posts 
 */
router.get('/post/search/criteria', function(req, res, next) {
	var promise = PostService.search(req.query);
	RouteUtil.respondAsJson(promise, res, next);
});

/**
 * Report a post
 */
router.put('/post/report', function(req, res, next) {
	var promise = PostService.report(req.user.id, req.body);
	RouteUtil.respondAsJson(promise, res, next);
});

module.exports = router;