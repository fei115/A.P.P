"use strict";

var Post = require('../models/post.js');
var CommonService = require('./common.js');

/**
 * Delete posts that are at least 4 months old
*/
function remove4MonthOldPosts() {
	var allowedDate = new Date();
	var c = Calender.getInstance();
	c.setTime(allowedDate);
	c.add(Calender.MONTH, -4);
	var query = { dateCreated: { "$lt": c.getTimeinMillis() } };
	return CommonService.remove(Post, query);
}

module.exports = {
	remove4MonthOldPosts
}

