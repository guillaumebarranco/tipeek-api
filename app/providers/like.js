"use strict";

const providerUtils = require('../utils/provider');

class likeProvider {

	getAllLikes(callback) {
		return providerUtils.getAllFromCollection('likes', callback);
	}

	getAllUserLikes(userId, callback) {
		userId = parseInt(userId);
		return providerUtils.findAllFromCollection('likes', {userId}, callback);
	}

	insertLike(like, callback) {
		return providerUtils.insertInCollection('likes', like, callback);
	}
}

module.exports = likeProvider;
