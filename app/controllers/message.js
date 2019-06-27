"use strict";

const
	messageProviderClass = require('./../providers/message'),
	messageProvider = new messageProviderClass(),
	userProviderClass = require('./../providers/user'),
	userProvider = new userProviderClass()
;

class Message {

	getAllMessages(callback) {

		messageProvider.getAllMessages(function(response) {
			callback(response);
		});
	}

	getAllUsersFromMembers(ids, users, callback) {

		if(typeof ids[0] !== "undefined") {

			userProvider.getUserFromId(ids.shift(), (resUser) => {
				users.push(resUser);
				this.getAllUsersFromMembers(ids, users, callback);
			});

		} else {
			callback(users);
		}
	}

	getAllUsersFromContacts(ids, contacts, callback) {

		if(typeof ids[0] !== "undefined") {

			let id = ids.shift();

			userProvider.getUserFromId(id, (resUser) => {

				for(const i in contacts) {

					if(contacts[i].id === id) {
						contacts[i].name = resUser[0].name;
						contacts[i].picture = resUser[0].picture;
					}
				}

				this.getAllUsersFromContacts(ids, contacts, callback);
			});

		} else {
			callback(contacts);
		}
	}

	getContacts(userId, callback) {

		messageProvider.getMessagesFromUserId(userId, (response) => {

			messageProvider.getMessagesFromContactId(userId, (responseSecond) => {

				response = response.concat(responseSecond);

				let contacts = [];
				let ids = [];

				userId = parseInt(userId);

				for(const i of response) {

					// user is contact
					if(i.userId === userId && ids.indexOf(i.contactId) === -1) {

						ids.push(i.contactId);

						contacts.push({
							id: i.contactId,
							name: "",
							picture: ""
						});
					}

					// user is user
					if(i.contactId === userId && ids.indexOf(i.userId) === -1) {

						ids.push(i.userId);

						contacts.push({
							id: i.userId,
							name: "",
							picture: ""
						});
					}
				}

				this.getAllUsersFromContacts(ids, contacts, (contactsFinal) => {

					console.log('contactsFinal', contactsFinal);
					callback(contactsFinal);
				});
			});
		});
	}

	getMessages(userId, contactId, callback) {

		messageProvider.getMessages(userId, contactId, function(response) {
			messageProvider.getMessages(contactId, userId, function(responseSecond) {

				response = response.concat(responseSecond);

				response.sort(function(a,b) {
					return new Date(b.timestamp) - new Date(a.timestamp);
				});

				userProvider.getUserFromId(userId, (user) => {
					userProvider.getUserFromId(contactId, (contact) => {

						for(const i of response) {

							if(i.userId === userId) {
								i.user = user;
							}

							if(i.userId === contactId) {
								i.user = contact;
							}

							if(i.contactId === userId) {
								i.contact = user;
							}

							if(i.contactId === contactId) {
								i.contact = contact;
							}
						}

						callback(response);
					});
				});
			});
		});
	}



	insertMessage(message, convId, callback) {

		messageProvider.insertMessage(message, convId, function(response) {
			callback(response);
		});
	}

	createConv(userId, secondUserId, callback) {

		messageProvider.createConv(userId, secondUserId, function(response) {
			callback(response);
		});
	}
}

module.exports = Message;
