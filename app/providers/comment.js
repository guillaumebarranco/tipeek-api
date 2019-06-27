"use strict";

const providerUtils = require('../utils/provider');

class commentProvider {

	getAllComments(callback) {
		return providerUtils.getAllFromCollection('comments', callback);
	}

	insertComment(comment, goodId, callback) {

		comment.goodId = goodId;

		return providerUtils.insertInCollection('comments', comment, callback);
	}

	getGoodComments(goodId, callback) {
		goodId = parseInt(goodId);
		return providerUtils.findAllFromCollection('comments', {goodId: parseInt(goodId)}, callback);
	}
}

module.exports = commentProvider;
