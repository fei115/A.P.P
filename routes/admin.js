var express = require('express');
var router = express.Router();
var RouteUtil = require('./util.js');
var passport = require('../middlewares/passport.js');
var AdminService = require('../services/admin.js');

router.use(passport.authenticate('local', { session: false }));
router.use(isAdmin);

/**
 * Delete posts older than 4 months
 */
router.delete('/admin/clean', function(req, res, next) {
	var promise = AdminService.remove4MonthOldPosts();
	RouteUtil.respondAsJson(promise, res, next);
});
 
/**
 * Only admin can use these endpoints
 */
function isAdmin(req, res, next) {
	if(req.user.role === 'Admin') {
		return next();
	} else {
		res.status(401).send({ success: false, message: 'Unauthorized' });
	}
}

module.exports = router;