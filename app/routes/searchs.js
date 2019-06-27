"use strict";

const 
	express = require('express'),
	router = express.Router(),
	searchsControllerClass = require('./../controllers/search'),
	searchsController = new searchsControllerClass()
;

/*******************/
/*       GET       */
/*******************/

router.get('/all', function(req, res) {

	searchsController.getAllsearchs(function(response) {
		res.status(200).send(response);
	});
});

router.get('/:id', function(req, res) {

	const userId = req.params.id;

	searchsController.getUserSearch(userId, function(response) {
		res.status(200).send(response);
	});
});

router.get('/phone/:phone', function(req, res) {

	const phone = req.params.phone;

	searchsController.getExistingSearch(phone, function(response) {
		res.status(200).send(response);
	});
});

router.post('/insert', function(req, res) {

	const user = req.body.user;

	console.log('user', user);

	searchsController.insertSearch(user, function(response) {
		res.status(200).send(response);
	});
});

router.post('/update/member', function(req, res) {

	const creator = req.body.creator;
	const phone = req.body.phone;
	const userId = req.body.userId;

	searchsController.updateSearchMember(creator, phone, userId, function(response) {
		res.status(200).send(response);
	});
});

module.exports = router;