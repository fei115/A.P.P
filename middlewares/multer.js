"use strict";

var mime = require('mime');
var multer = require('multer');
var authService = require('../services/auth.js');
var imagesPath = './public/images/';

function multerUpload(storageType) {
	if (storageType === 'Disk') {
		return multer({ storage: diskStorage() })
	} else {
		return multer({ storage: defaultStorage() })
	}
};

function defaultStorage() {
	return diskStorage();
};

function diskStorage(path) {
	var dest = path || imagesPath;
	var storage = multer.diskStorage(
		{
			destination: function(req, file, cb) {
				cb(null, dest);
			},
			filename: function(req, file, cb) {
				cb(null, authService.genRandomString(10) + '_' + Date.now() + '.' + mime.extension(file.mimetype));
			}
		}
	);
	return storage;
};

module.exports = multerUpload
