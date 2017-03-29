"use strict";

/**
 * Send `Result` back to client, where `result` is a JSON object.
 */
function respond(result, res, next) {
	if (result instanceof Error) {
		return next(result);
	} else {
		return res.json(result);
	}
}

/**
 * Send `promise` back to client, where promise has the form Promise(JSON).
 */
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