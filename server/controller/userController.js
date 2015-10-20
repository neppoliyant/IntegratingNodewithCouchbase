var url = require('url');
var constructErrorMessage = require('../utils/appUtils').constructErrorMessage;
var constructSuccessMessage = require('../utils/appUtils').constructSuccessMessage;
var db = require('../dao/db');
var utils = require('../utils/appUtils');
var fs = require('fs');
var config = require('../config/config.js');
var logger = require('../log/winston');
var auditlog = require('../log/auditlog').auditlog;


function getUserbyId(req, res) {
    logger.info("MethodEnter: getUsers");
    if (!req.params.id) {
        res.statusCode = 400;
        res.send(constructErrorMessage("id is Mandatory", 400));
    } else {
        db.getUser(req.params.id, function(err, result) {
            if (err || !result) {
                res.statusCode = 500;
                res.send(constructErrorMessage(err, 500));
                auditlog(req, err);
            } else {
                res.statusCode = 200;
                res.send(result.value);
                auditlog(req, result.value);
            }
        });
    }
    logger.info("MethodExit: getUsers");
}

function addUser(req, res) {
    logger.info("MethodEnter: addUser");
    if (!req.body) {
        res.statusCode = 400;
        res.send(constructErrorMessage("payload is Mandatory", 400));
    } else {
        if (req.body.type == "IntegrationCouchNode") {
            db.updateUser(req.params.id, req.body, function(err, result) {
                if (err || !result) {
                    res.statusCode = 500;
                    res.send(constructErrorMessage(err, 500));
                    auditlog(req, err);
                } else {
                    res.statusCode = 200;
                    res.send(constructSuccessMessage("Updated/Inserted Successfully", 200, result));
                    auditlog(req, "Success");
                }
            }); 
        } else {
            res.statusCode = 400;
            res.send(constructErrorMessage("parameter type is missing.", 400));
            auditlog(req, "parameter type is missing.");
        }
    }
    logger.info("MethodExit: addUser");
}

function deleteUserbyId(req, res) {
    logger.info("MethodEnter: deleteUserbyId");
    if (!req.params.id) {
        res.statusCode = 400;
        res.send(constructErrorMessage("id is Mandatory", 400));
    } else {
        db.deleteUser(req.params.id, function(err, result) {
            if (err || !result) {
                res.statusCode = 500;
                res.send(constructErrorMessage(err, 500));
                auditlog(req, err);
            } else {
                res.statusCode = 200;
                res.send(constructSuccessMessage("Deleted Successfully", 200, result));
                auditlog(req, "Delete Successfully");
            }
        });
    }
    logger.info("MethodExit: deleteUserbyId");
}

function getAllUsers(req, res) {
    logger.info("MethodEnter: getAllUsers");
    db.getAllUsers(function(err, result) {
        if (err || !result) {
            res.statusCode = 500;
            res.send(constructErrorMessage(err, 500));
            auditlog(req, err);
        } else {
            res.statusCode = 200;
            res.send(constructSuccessMessage("Fetched Successfully", 200, result));
            auditlog(req, "Fetched Successfully");
        }
    });
    logger.info("MethodExit: getAllUsers");
}

function getAllDocuments(req, res) {
    logger.info("MethodEnter: getAllDocuments");
    db.getAllDocuments(function(err, result) {
        if (err || !result) {
            res.statusCode = 500;
            res.send(constructErrorMessage(err, 500));
            auditlog(req, err);
        } else {
            res.statusCode = 200;
            console.log(JSON.stringify(result));
            res.send(constructSuccessMessage("Fetched Successfully", 200, result));
            auditlog(req, "Fetched Successfully");
        }
    });
    logger.info("MethodExit: getAllDocuments");
}

module.exports.getUserbyId = getUserbyId;
module.exports.addUser = addUser;
module.exports.deleteUserbyId = deleteUserbyId;
module.exports.getAllUsers = getAllUsers;
module.exports.getAllDocuments = getAllDocuments;

