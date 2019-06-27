"use strict";

const providerUtils = require('../utils/provider');

class messageProvider {

	getAllMessages(callback) {
		return providerUtils.getAllFromCollection('messages', callback);
	}

	insertMessage(message, callback) {
		message.userId = parseInt(message.userId);
		message.contactId = parseInt(message.contactId);
		message.timestamp = Date.now();
		return providerUtils.insertInCollection('messages', message, callback);
	}

	getMessagesFromUserId(userId, callback) {
		userId = parseInt(userId);
		return providerUtils.findAllFromCollection('messages', {userId}, callback);
	}

	getMessagesFromContactId(contactId, callback) {
		contactId = parseInt(contactId);
		return providerUtils.findAllFromCollection('messages', {contactId}, callback);
	}

	getMessages(userId, contactId, callback) {

		providerUtils.getMongo(function(db) {

			db
			.collection('messages')
			.find({
				userId: parseInt(userId),
				contactId: parseInt(contactId)
			})
			.sort({timestamp: 1})
			.toArray(function (error, results) {
				console.log('results', results);
				if (error) throw error;
				callback(results);
			});
		});
	}
}

module.exports = messageProvider;
