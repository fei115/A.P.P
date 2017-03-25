
var Post = require('../models/post.js')
var Report = require('../models/report.js')
var CommonService = require('./common.js');

/**
 * Delete old posts
*/

function remove4MonthOldPosts() {
	Date allowedDate = new Date();
	Calender c = Calender.getInstance();
	c.setTime(allowedDate);
	c.add(Calender.MONTH, -4);
	var query = { dateCreated: { "$lt": c.getTimeinMillis() } };
	return CommonService.remove( Post, query );
}