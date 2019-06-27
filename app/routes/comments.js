"use strict";

const 
	express = require('express'),
	router = express.Router(),
	commentsControllerClass = require('./../controllers/comment'),
	commentsController = new commentsControllerClass()
;

/*******************/
/*       GET       */
/*******************/

router.get('/all', function(req, res) {

	commentsController.getAllComments(function(response) {
		res.status(200).send(response);
	});
});

router.get('/:id', function(req, res) {

	const goodId = req.params.id;

	commentsController.getGoodComments(goodId, function(response) {
		res.status(200).send(response);
	});
});

router.post('/insert', function(req, res) {

	const comment = req.body.comment;
	const goodId = req.body.goodId;

	commentsController.insertComment(comment, goodId, function(response) {
		res.status(200).send(response);
	});
});

module.exports = router;