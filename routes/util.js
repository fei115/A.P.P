var mongoose = require('mongoose'); 

function respondAsJson(promise, res, next) {
	promise
	.then(function(object) {
		return res.json(object);
	})
	.catch(function(err) {
		return next(err);
	})
}

module.exports = {
	respondAsJson
}