var mongoose = require('mongoose'); 

/**
 * An entry point for findById.
 * All fetch by id should call this function to avoid repeated code.
 */
function loadDocument(model) {
  return function(req, res, next) {
	  var objectId = req.params.id;
	  model.findById(objectId, function(err, doc) {
		if (err) {
			next(err);
		}
		else if (!doc) {
			next(new Error("Error finding the " + model.modelName));
		}
		else {
			req.doc = doc;
			next();
		}
    });
  }
}

module.exports = {
	loadDocument
}