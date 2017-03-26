
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); 
var Post = require('../models/post.js');
var RouteUtil = require('./util.js');
var PostService = require('../services/post.js');
var CommonService = require('../services/common.js');
var AdminService = require('../services/admin.js');

/**
 * Delete posts older than 4 months
 */
 router.delete('/admin/delete', function(req, res, next) {
	var promise = AdminService.remove4MonthOldPosts();
	RouteUtil.respondAsJson(promise, res, next);
});
 
 
module.exports = router;