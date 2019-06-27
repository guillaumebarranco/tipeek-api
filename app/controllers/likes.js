"use strict";

const
	likeProviderClass = require('./../providers/like'),
	likeProvider = new likeProviderClass()
;

class Like {

	getAllLikes(callback) {

		likeProvider.getAllLikes(function(response) {
			callback(response);
		});
	}

	insertLike(like, callback) {

		likeProvider.insertLike(like, function(response) {
			callback(response);
		});
	}
}

module.exports = Like;
