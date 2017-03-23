var express = require('express');
var router = express.Router();
var imageService = require('../services/image.js');

/**
 * Store the uploaded images in disk
 */
router.post('/images/upload', imageService.multerUpload().array('images'), function(req, res, next){
  console.log(req.files[0]);
  var filenames  = {
	  imagenames : req.files.map(function(f) { return f.filename;})
  }
  res.json(filenames);
});

module.exports = router;