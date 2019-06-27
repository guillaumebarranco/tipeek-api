"use strict";

const providerUtils = require('../utils/provider');

const ObjectId = require('mongodb').ObjectID;

class goodProvider {

	getAllGoods(callback) {
		return providerUtils.getAllFromCollection('goods', callback);
	}

	getAllGoodsFromSearch(search, callback) {
		// return providerUtils.getAllFromCollection('goods', callback);

		search.budgetMin = 1;
		search.budgetMax = 5000000;

		providerUtils.getMongo(function(db) {

			db.collection("goods").find({

				// $gt => greather than
				// $gte => greather than or equal

				price: {
					$gte: search.budgetMin, 
					$lte: search.budgetMax
				},

				surface: {
					$gte: search.surfaceMin, 
					$lte: search.surfaceMax
				},

				nbPieces: {
					$gte: search.nbPieces
				},

				nbRooms: {
					$gte: search.nbRooms
				}



			}).toArray(function (error, results) {
				if (error) throw error;
				callback(results);
			});
		});
	}

	getAllGoodsLiked(likes, callback) {
		return providerUtils.findAllFromCollectionInArrayTwo('goods', likes, callback);
	}

	getGoodById(id, callback) {

		providerUtils.getMongo(function(db) {

			let oid;

			try {

				oid = new ObjectId(id);

			} catch(e) {

				return callback({
					status: "error",
					error: e
				});
			}

			db.collection("goods").find({"_id": oid}).toArray(function (error, results) {
				if (error) throw error;

				callback({
					status: "success",
					results
				});
			});
		});
	}

	insertGood(good, callback) {
		return providerUtils.insertInCollection('goods', good, callback);
	}
}

module.exports = goodProvider;
