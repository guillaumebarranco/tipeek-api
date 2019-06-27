"use strict";

const
	goodsProviderClass = require('./../providers/good'),
	goodsProvider = new goodsProviderClass(),
	likesProviderClass = require('./../providers/like'),
	likesProvider = new likesProviderClass()
;

class Goods {

	getAllGoods(callback) {

		goodsProvider.getAllGoods(function(response) {
			callback(response);
		});
	}

	getAllGoodsFromSearch(search, callback) {

		goodsProvider.getAllGoodsFromSearch(search, function(response) {
			callback(response);
		});
	}

	getAllGoodsLiked(userId, callback) {

		likesProvider.getAllUserLikes(userId, function(likes) {

			console.log('likes', likes);

			let likesArray = [];

			for(var i in likes) {
				likesArray.push(likes[i].goodId);
			}

			console.log('likesArray', likesArray);

			goodsProvider.getAllGoodsLiked(likesArray, function(response) {
				callback(response);
			});
		});
	}

	getGoodById(id, callback) {

		goodsProvider.getGoodById(id, (response) => {
			callback(response);
		});
	}

	insertGood(good, callback) {

		goodsProvider.insertGood(good, function(response) {
			callback(response);
		});
	}
}

module.exports = Goods;
