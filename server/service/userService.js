module.exports = function() {
    var express = require('express');
    var app = express();
    var methodOverride = require('method-override');
    var user = require('../controller/userController');
    var userConnector = require('../connector/userConnector');
    var logger = require('../log/winston');
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.logger());
    app.use(methodOverride('_method'));
    app.use(express.bodyParser());

	app.get('/user/:id', function(req, res, next) {
	    user.getUserbyId(req, res);
	});

    app.get('/users', function(req, res, next) {
        user.getAllUsers(req, res);
    });

    app.get('/documents', function(req, res, next) {
        user.getAllDocuments(req, res);
    });

	app.put('/user/:id', function(req, res, next) {
        user.addUser(req, res);
	});

    app.post('/user/:id', function(req, res, next) {
        user.addUser(req, res);     
    });

    app.delete('/user/:id', function(req, res, next) {
        user.deleteUserbyId(req, res);      
    });

	return app;
}();