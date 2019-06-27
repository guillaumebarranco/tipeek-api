"use strict";

const
	express = require('express'),
    busboy = require('connect-busboy'),
	cookieParser = require('cookie-parser'),
	cors = require('cors'),
	bodyParser = require('body-parser'),
    app = express()
;

global.mongoConfig = {

    dev: {
        url: "localhost"
    },
    prod: {
        url: "http://92.222.34.194"
    }
};

global.env = "dev";

global.mongo = require("mongodb").MongoClient;
global.port = 1208;

class AppFunctions {

	constructor() {
    }

	enableSessions() {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(cookieParser());
        app.use(busboy());
    }

    useCors() {
        app.use(cors());
    }

	enableProxy() {
        app.enable('trust proxy');
    }

	handle404() {
        app.use((req, res) => {
            res.status(405).send({
                message: "This route is not allowed !"
            });
        });
    }
}

const myApp = new AppFunctions();

myApp.enableSessions();
myApp.useCors();
myApp.enableProxy();
// myApp.handle404();

class Routes {

    constructor() {

        const getRoutes = this.getRoutes(),
            setRoutes = this.setRoutes(getRoutes)
        ;

        for(const route in setRoutes) {

            if(setRoutes.hasOwnProperty(route)) {
                this.useRoutes(setRoutes[route]);
            }
        }
    }

    getRoutes() {

        return {
            users              :       require('./app/routes/users'),
            goods              :       require('./app/routes/goods'),
            likes              :       require('./app/routes/likes'),
            spots              :       require('./app/routes/spots'),
            searchs            :       require('./app/routes/searchs'),
            messages           :       require('./app/routes/messages'),
            comments           :       require('./app/routes/comments'),
        };
    }

    setRoutes(getRoutes) {
        return {

            Users: {
                '/users'                :       getRoutes.users,
            },
            Goods: {
                '/goods'                :       getRoutes.goods,
            },
            Likes: {
                '/likes'                :       getRoutes.likes,
            },
            Spots: {
                '/spots'                :       getRoutes.spots,
            },
            Searchs: {
                '/search'               :       getRoutes.searchs,
            },
            Comments: {
                '/comments'             :       getRoutes.comments,
            },
            Messages: {
                '/messages'             :       getRoutes.messages,
            },
        };
    }

    useRoutes(routes) {
        for (const route in routes) {
            if(routes.hasOwnProperty(route)) app.use(route, routes[route]);
        }
    }
}

new Routes();

var server = require('http').Server(app);

server.listen(global.port, function() {
    console.log("listening");
});
