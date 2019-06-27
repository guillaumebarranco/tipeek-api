"use strict";

const providerUtils = require('../utils/provider');

class searchProvider {

	getAllSearchs(callback) {
		return providerUtils.getAllFromCollection('searchs', callback);
	}

	insertSearch(search, callback) {
		return providerUtils.insertInCollection('searchs', search, callback);
	}

	getUserSearch(creator, callback) {
		creator = parseInt(creator);
		return providerUtils.findAllFromCollection('searchs', {creator}, callback);
	}

	getExistingSearch(phone, callback) {
		return providerUtils.getAllFromCollection('searchs', callback);
	}

	getMemberSearch(userId, callback) {
		userId = parseInt(userId);
		return providerUtils.findAllFromCollection('searchs', {userId}, callback);
	}

	updateSearchMember(id, members, callback) {

		console.log('------- members ADD -------', members);

		providerUtils.getMongo(function(db) {

			db
			.collection('searchs')
			.update({
				_id: id
			}, {$set: {members: members}}
			, function (error, results) {
				console.log('results', results);
				if (error) throw error;
				callback(results);
			});
		});
	}
}

module.exports = searchProvider;
