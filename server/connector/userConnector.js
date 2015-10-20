var constructErrorMessage = require('../utils/appUtils').constructErrorMessage;
var constructSuccessMessage = require('../utils/appUtils').constructSuccessMessage;
var request = require('../connector/requestApi');
var config = require('../config/config.js');
var logger = require('../log/winston');

function getUsers(req, res) {
	logger.info("MethodEnter: getUsers");
    var uri = config.connectorUrl;
    request.requestApi(uri, null, "GET", null, function(err, res1) {
        res.statusCode=res1.statusCode;
        res.send(res1.body);
        logger.info("MethodExit: getUsers");
    });
}

module.exports.getUsers = getUsers;