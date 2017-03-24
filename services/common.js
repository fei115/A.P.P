/**
 * Find a doc of type 'model' using 'findById'
 * Uses lean() unless opt.json is specified as false
 */
function findById(model, id, opt) {
	var query = model.findById(id)
	if (opt && opt.json === false) {
		// do nothing;
	} else {
		query.lean()
	}
	return query
	.exec()
	.then(function(doc) {
		if (!doc) {
			throw new Error("Error finding the " + model.modelName);
		} else {
			return doc;
		}
	})
	.catch(function(err) {
		throw err;
	});
}

/**
 * Find a doc of type 'model' using 'findById'
 * Uses lean() unless opt.json is specified as false
 */
function findAll(model, opt) {
	var query = model.find()
	if (opt && opt.json === false) {
		// do nothing;
	} else {
		query.lean()
	}
	return query
	.exec()
	.then(function(docs) {
		return docs;
	})
	.catch(function(err) {
		throw err;
	});
}

function create(model, data) {
	var modelInstance = new model(data);
	return modelInstance
	.save()
	.then(function(doc) {
		return doc.toJSON();
	})
	.catch(function(err) {
		throw err;
	})
}

function findOneAndUpdate(model, query, data, opt) {
	if (opt) {
		// do nothing
	} else {
		opt = { new: true, runValidators: true }
	}
	return model
	.findOneAndUpdate(query, data, opt)
	.exec()
	.then(function(doc) {
		if (!doc) {
			throw new Error("Error finding the " + model.modelName);
		} else {
			return doc.toJSON();
		}
	})
	.catch(function(err) {
		throw err;
	});
}

function remove(model, query) {
	return model
	.remove(query)
	.exec()
	.then(function(removed) {
		if (removed.result.n == 0) {
			throw new Error('Cannot delete because the given ' + model.modelName + ' does not exists.');
		} else {
			var message = removed.result.n + ' ' + model.modelName + ' deleted.';
			return { success: true, message: message }
		}
	})
	.catch(function(err) {
		throw err;
	});
}

module.exports = {
	findById,
	findAll,
	create,
	findOneAndUpdate,
	remove
}