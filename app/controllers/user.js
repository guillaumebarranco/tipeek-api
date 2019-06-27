"use strict";

const
	userProviderClass = require('./../providers/user'),
	userProvider = new userProviderClass()
;

class User {

	getAllUsers(callback) {

		userProvider.getAllUsers(function(response) {
			callback(response);
		});
	}

	insertUser(user, callback) {

		const balavoine = {
			id: 		user.id,
			name: 		user.name,
			phone: 		user.phone,
			type: 		user.type,
			birthday: 	user.birthday,
			specific: 	user.specific,
			email: 		user.email,
			address: 	user.address,
			picture: 	user.picture
		};

		userProvider.insertUser(balavoine, function(response) {
			callback(response);
		});
	}

	insertUserPosition(position, callback) {

		userProvider.insertUserPosition(position, function(response) {
			callback(response);
		});
	}

	insertRecursivePositions(positions, callback) {

		for(const position of positions) {
			userProvider.insertUserPosition(position, function() {});
		}

		callback({});
	}

	getAllUserPositions(user, callback) {

		userProvider.getAllUserPositions(user, (response) => {
			callback(response);
		});
	}

	countAllPositions(callback) {
		userProvider.countAllPositions((response) => {
			callback(response);
		});
	}

	checkIfPhoneNumberIsAvailable(phoneNumber, callback) {
		userProvider.checkIfPhoneNumberIsAvailable(phoneNumber, (response) => {
			callback(response);
		});
	}
}

module.exports = User;
