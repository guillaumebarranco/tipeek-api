"use strict";

const
	spotProviderClass = require('./../providers/spot'),
	spotProvider = new spotProviderClass(),
	searchControllerClass = require('./../controllers/search'),
	searchController = new searchControllerClass(),
	userProviderClass = require('./../providers/user'),
	userProvider = new userProviderClass()
;

class Spot {

	getAllSpots(callback) {

		spotProvider.getAllSpots(function(response) {
			callback(response);
		});
	}

	getUserSpots(userId, callback) {

		spotProvider.getUserSpots(parseInt(userId), function(response) {
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

	getSearchSpots(userId, callback) {

		searchController.getUserSearch(userId, (search) => {

			if(typeof search[0] !== "undefined") {

				let ids = [];

				for(const member of search[0].members) {
					ids.push(member.id);
				}

				spotProvider.getSearchSpots(ids, (response) => {

					this.getAllUsersFromMembers(ids, [], (users) => {

						for(const user of users[0]) {

							for(const i in response) {

								if(response[i].userId === user.id) {
									response[i].user = user;
								}
							}
						}

						callback(response);
					});
				});

			} else {
				callback([]);
			}
		});
	}

	insertSpot(spot, callback) {

		spotProvider.insertSpot(spot, function(response) {
			callback(response);
		});
	}
}

module.exports = Spot;
