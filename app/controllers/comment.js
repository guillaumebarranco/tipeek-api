"use strict";

const
	commentProviderClass = require('./../providers/comment'),
	commentProvider = new commentProviderClass()
;

class Comment {

	getAllComments(callback) {

		commentProvider.getAllComments(function(response) {
			callback(response);
		});
	}

	getGoodComments(goodId, callback) {

		commentProvider.getGoodComments(goodId, function(response) {
			callback(response);
		});
	}

	insertComment(comment, goodId, callback) {

		commentProvider.insertComment(comment, goodId, function(response) {
			callback(response);
		});
	}
}

module.exports = Comment;
