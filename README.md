# API-Tipeek
An API for Managing Tipeek datas

## Installation
	clone/pull the repository
	cd tipeekapi
	npm install
	(install MongoDB and Robomongo if not exists)

## Launch
	(npm i supervisor -g) just one time
	supervisor -- app.js

	(in other terminal) mongod


## Mongo commands
	use tipeek
	db.users.insert({name:"testttttt"})
	db.users.insert({name:"omgomgomg"})
	db.createUser(   {     user: "admin",     pwd: "admin",     roles: [ { role: "readWrite", db: "tipeek" } ]})
