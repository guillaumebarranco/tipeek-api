"use strict";

const 
	express = require('express'),
	router = express.Router(),
	spotsControllerClass = require('./../controllers/spot'),
	spotsController = new spotsControllerClass()
;

/*******************/
/*       GET       */
/*******************/

router.get('/all', function(req, res) {

	spotsController.getAllSpots(function(response) {
		res.status(200).send(response);
	});
});

router.get('/:id', function(req, res) {

	const userId = req.params.id;

	spotsController.getUserSpots(userId, function(response) {
		res.status(200).send(response);
	});
});

router.get('/search/:id', function(req, res) {

	const userId = req.params.id;

	spotsController.getSearchSpots(userId, function(response) {
		res.status(200).send(response);
	});
});

router.post('/insert', function(req, res) {

	const spot = req.body.spot;

	spotsController.insertSpot(spot, function(response) {
		res.status(200).send(response);
	});
});

module.exports = router;