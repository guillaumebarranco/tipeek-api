"use strict";

const 
	express = require('express'),
	router = express.Router(),
	goodsControllerClass = require('./../controllers/goods'),
	goodsController = new goodsControllerClass()
;

/*******************/
/*       GET       */
/*******************/

router.get('/all', function(req, res) {

	goodsController.getAllGoods(function(response) {
		res.status(200).send(response);
	});
});

router.post('/search', function(req, res) {

	const search = req.body.search;

	goodsController.getAllGoodsFromSearch(search, function(response) {
		res.status(200).send(response);
	});
});

router.get('/liked/:id', function(req, res) {

	const userId = req.params.id;

	goodsController.getAllGoodsLiked(userId, function(response) {
		res.status(200).send(response);
	});
});

router.get('/:id', function(req, res) {

	const id = req.params.id;

	goodsController.getGoodById(id, function(response) {
		res.status(200).send(response);
	});
});

router.post('/insert', function(req, res) {

	const good = req.body.good;

	goodsController.insertGood(good, function(response) {
		res.status(200).send(response);
	});
});

module.exports = router;