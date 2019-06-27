"use strict";

const providerUtils = require('../utils/provider');

class userProvider {

	getAllUsers(callback) {
		return providerUtils.getAllFromCollection('users', callback);
	}

	insertUser(user, callback) {
		return providerUtils.insertInCollection('users', user, callback);
	}

	insertUserPosition(position, callback) {
		return providerUtils.insertInCollection('positions', position, callback);
	}

	getUserFromId(id, callback) {
		return providerUtils.findAllFromCollection('users', {id}, callback);
	}

	getAllUserPositions(user, callback) {
		return providerUtils.findAllFromCollection('positions', {user}, callback);
	}

	countAllPositions(callback) {
		return providerUtils.countAllFromCollection('positions', callback);
	}

	checkIfPhoneNumberIsAvailable(phone, callback) {
		return providerUtils.findAllFromCollection('users', {phone}, callback);
	} 
}

module.exports = userProvider;
