"use strict";

const
	searchProviderClass = require('./../providers/search'),
	searchProvider = new searchProviderClass(),
	userProviderClass = require('./../providers/user'),
	userProvider = new userProviderClass()
;

class Search {

	getAllSearchs(callback) {

		searchProvider.getAllSearchs((response) => {
			callback(response);
		});
	}

	getUserSearch(userId, callback) {

		searchProvider.getUserSearch(userId, (response) => {
			console.log('responseeee search', response);

			if(typeof response[0] !== "undefined") {
				callback(response);
			} else {
				searchProvider.getAllSearchs((searchs) => {

					console.log('all researchs', response);
					console.log('userId', userId);

					let search = [];

					for(const i of searchs) {

						for(const j of i.members) {

							if(j.id === parseInt(userId)) {
								search.push(i);
							} 
						}
					}

					console.log('final search', search);

					callback(search);
				});
			}
		});
	}

	getPhoneCorrespondance(phone, response) {

		for(const i of response) {

			for(const member of i.members) {

				if(member.phone === phone) {
					return i;
				}
			}
		}

		return false;
	}

	getExistingSearch(phone, callback) {

		searchProvider.getExistingSearch(phone, (response) => {

			const search = this.getPhoneCorrespondance(phone, response);

			if(!search) {
				return callback(false);
			} else {

				userProvider.getUserFromId(search.creator, (user) => {

					return callback({
						user: user[0],
						search
					});
				});
			}
		});
	}

	insertSearch(user, callback) {

		const search = {
			searchType: 	user.search.searchType,
			homeType: 		user.search.homeType,
			surfaceMin: 	user.search.surfaceMin,
			surfaceMax: 	user.search.surfaceMax,
			nbRooms: 		user.search.nbRooms,
			nbChambers: 	user.search.nbChambers,
			budgetMin: 		user.search.budgetMin,
			budgetMax: 		user.search.budgetMax,
			creator: 		user.id,
			creationDate: 	Date.now(),
			members: 		[{id: user.id, phone:user.phone}]
		};

		for(const i of user.search.contacts) {

			search.members.push({
				id: null,
				phone: i.phone
			});
		}

		searchProvider.insertSearch(search, function(response) {
			callback(response);
		});
	}

	updateSearchMember(creator, phone, userId, callback) {

		searchProvider.getUserSearch(creator, (search) => {

			let members = search[0].members;

			console.log('DNQOIDFN userId', userId);

			for(const i in members) {

				if(members[i].phone === phone) {
					members[i].id = parseInt(userId);
				}
			}

			searchProvider.updateSearchMember(search[0]._id, members, function(response) {
				callback(response);
			});
		});
	}
}

module.exports = Search;
