var mongoose = require('mongoose'); 

/**
 * An entry point for findById.
 * All fetch by id should call this function to avoid repeated code.
 */
function loadDocument(model) {
  return function(req, res, next) {
	  var objectId = req.params.id || req.body.id || req.body._id;
	  model.findById(objectId, function(err, doc) {
		if (err) {
			return next(err);
		}
		else if (!doc) {
			console.log(objectId);
			return next(new Error("Error finding the " + model.modelName));
		}
		else {
			req.doc = doc;
			return next();
		}
    });
  }
}

module.exports = {
	loadDocument
}