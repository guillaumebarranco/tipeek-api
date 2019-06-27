"use strict";

const providerUtils = require('../utils/provider');

class spotProvider {

	getAllSpots(callback) {
		return providerUtils.getAllFromCollection('spots', callback);
	}

	insertSpot(spot, callback) {
		return providerUtils.insertInCollection('spots', spot, callback);
	}

	getSearchSpots(array, callback) {
		return providerUtils.findAllFromCollectionInArray('spots', array, callback);
	}

	getUserSpots(userId, callback) {
		return providerUtils.findAllFromCollection('spots', {userId}, callback);
	}
}

module.exports = spotProvider;
