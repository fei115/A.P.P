var express = require('express');
var router = express.Router();
var multer = require('../middlewares/multer.js');

/**
 * Store the uploaded images in disk
 */
router.post('/images/upload', multer().array('images'), function(req, res, next){

  console.log(req.files[0]);
  var filenames  = {
	  imagenames : req.files.map(function(f) { return f.filename;})
  }
  res.json(filenames);
});

module.exports = router;