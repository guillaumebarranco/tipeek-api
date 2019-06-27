"use strict";

const 
	express = require('express'),
	router = express.Router(),
	likeControllerClass = require('./../controllers/likes'),
	likeController = new likeControllerClass()
;

/*******************/
/*       GET       */
/*******************/

router.get('/all', function(req, res) {

	likeController.getAllLikes(function(response) {
		res.status(200).send(response);
	});
});

router.post('/insert', function(req, res) {

	let like = req.body.like;

	likeController.insertLike(like, function(response) {
		res.status(200).send(response);
	});
});

module.exports = router;
