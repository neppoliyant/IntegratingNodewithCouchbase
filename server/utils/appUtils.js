var config = require('../config/config.js');

function constructErrorMessage(errorMessage, status) {
    var obj = {};
    obj.status = status;
    obj.error = true;
    obj.message = errorMessage;
    return obj;
}

function constructSuccessMessage(message, status, body) {
    var obj = {};
    obj.status = status;
    obj.error = false;
    obj.message = message;
    obj.body = body;
    return obj;
}

module.exports.constructErrorMessage = constructErrorMessage;
module.exports.constructSuccessMessage = constructSuccessMessage;