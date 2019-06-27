"use strict";

const 
	express = require('express'),
	router = express.Router(),
	userControllerClass = require('./../controllers/user'),
	userController = new userControllerClass(),
	fs = require('fs'),
	config = require('../config.json');
;

/*******************/
/*       GET       */
/*******************/

router.get('/getAllUsers', function(req, res) {

	userController.getAllUsers(function(response) {
		res.status(200).send(response);
	});
});


router.post('/upload', function(req, res) {

	const dirname = config.tipeekImgFolder;
	console.log('dirname', dirname);
	let fstream;

    req.pipe(req.busboy);

    req.busboy.on('file', function (fieldname, file, filename) {

        console.log("Uploading: " + filename); 

        fstream = fs.createWriteStream(dirname+'/uploads/'+filename);
        file.pipe(fstream);

        fstream.on('close', function () {
        	console.log('Upload succeed !');
            res.status(200).send({'status':"success"});
        });
    });
});

router.post('/insertUser', function(req, res) {

	let user = req.body.user;

	userController.insertUser(user, function(response) {
		res.status(200).send(response);
	});
});

router.post('/insertUserPosition', function(req, res) {

	let position = req.body.position;

	userController.insertUserPosition(position, function(response) {
		res.status(200).send(response);
	});
});

router.post('/insert/positions', (req, res) => {

	const positions = req.body.positions;

	userController.insertRecursivePositions(positions, function(response) {
		res.status(200).send(response);
	});
})

router.get('/count/positions', function(req, res) {

	userController.countAllPositions(function(response) {
		res.status(200).send({count: response});
	});
});

router.post('/user/positions', function(req, res) {

	var user = req.body.userId;

	userController.getAllUserPositions(user, function(response) {
		res.status(200).send(response);
	});
});

router.post('/phone/available', function(req, res) {

	var phoneNumber = req.body.phone;

	userController.checkIfPhoneNumberIsAvailable(phoneNumber, function(response) {
		res.status(200).send(response);
	});
});

module.exports = router;
