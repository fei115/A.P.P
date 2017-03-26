var express = require('express');
var router = express.Router();
var RouteUtil = require('./util.js');
var AdminService = require('../services/admin.js');

/**
 * Delete posts older than 4 months
 */
 router.delete('/admin/delete', function(req, res, next) {
	var promise = AdminService.remove4MonthOldPosts();
	RouteUtil.respondAsJson(promise, res, next);
});
 
module.exports = router;