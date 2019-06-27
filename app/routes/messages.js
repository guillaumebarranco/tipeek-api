"use strict";

const 
	express = require('express'),
	router = express.Router(),
	messagesControllerClass = require('./../controllers/message'),
	messagesController = new messagesControllerClass()
;

/*******************/
/*       GET       */
/*******************/

router.get('/all', function(req, res) {

	messagesController.getAllMessages(function(response) {
		res.status(200).send(response);
	});
});

router.get('/contacts/:userId', function(req, res) {

	const userId = req.params.userId;

	messagesController.getContacts(userId, function(response) {
		res.status(200).send(response);
	});
});

router.post('/get', function(req, res) {

	const userId = req.body.userId;
	const contactId = req.body.contactId;

	messagesController.getMessages(userId, contactId, function(response) {
		res.status(200).send(response);
	});
});

router.post('/insert', function(req, res) {

	const message = req.body.message;

	messagesController.insertMessage(message, function(response) {
		res.status(200).send(response);
	});
});

module.exports = router;