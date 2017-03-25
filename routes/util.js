"use strict";

function respond(result, res, next) {
	if (result instanceof Error) {
		return next(result);
	} else {
		return res.json(result);
	}
}

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
	respond,
	respondAsJson
}