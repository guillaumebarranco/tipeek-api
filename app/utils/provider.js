"use strict";

class ProviderUtils {

	getMongo(callback) {

		global.mongo.connect("mongodb://"+global.mongoConfig[global.env].url+"/tipeek", function(error, db) {
			if (error) console.log(error);
			callback(db);
		});
	}

	getAllFromCollection(collection, callback) {

		this.getMongo(function(db) {

			db.collection(collection).find().toArray(function (error, results) {
				if (error) throw error;

				// console.log(results);
				callback(results);
			});
		});
	}

	findAllFromCollection(collection, find, callback) {

		console.log('find', find);

		this.getMongo(function(db) {

			db.collection(collection).find(find).toArray(function (error, results) {
				if (error) throw error;

				console.log(results);
				callback(results);
			});
		});
	}

	findAllFromCollectionInArray(collection, array, callback) {

		console.log('array', array);

		this.getMongo(function(db) {

			db.collection(collection).find({ userId: { "$in" : array} }).toArray(function (error, results) {
				if (error) throw error;

				console.log(results);
				callback(results);
			});
		});
	}

	findAllFromCollectionInArrayTwo(collection, array, callback) {

		console.log('array', array);

		this.getMongo(function(db) {

			db.collection(collection).find({ id: { "$in" : array} }).toArray(function (error, results) {
				if (error) throw error;

				console.log(results);
				callback(results);
			});
		});
	}

	countAllFromCollection(collection, callback) {

		this.getMongo(function(db) {

			db.collection(collection).count(function (error, results) {
				if (error) throw error;
				callback(results);
			});
		});
	}

	insertInCollection(collection, data, callback) {

		this.getMongo(function(db) {

			db.collection(collection).insert(data, null, function (error, results) {
				if (error) throw error;

				console.log(`Le document ${collection} a bien été inséré`);
				callback(results);
			});
		});
	}
}

module.exports = new ProviderUtils();
