"use strict";

var express = require('express');
var router = express.Router();
var multer = require('../middlewares/multer.js');

/**
 * Store the uploaded images in disk
 */
router.post('/images/upload', multer().array('images'), function(req, res, next){
	var filenames  = {
		imagenames : req.files.map(function(f) { return f.filename;})
	}
	return res.json(filenames);
});

module.exports = router;