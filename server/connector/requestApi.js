var request = require("request");
var logger = require('../log/winston');

function requestApi(uri, oauthHeader, method, requestBody, callback) {
    logger.info(uri);
    var headers = oauthHeader ? {
        'Authorization': oauthHeader
    } : null;
    request({
        uri: uri,
        method : method,
        headers : headers,
        json : requestBody
    }, function(err, res) {
        try {
            var error;
            if (err) {
                error = true;
                logger.error('Request failure : ' + err);
                if (res && res.statusCode) {
                    logger.error('Request statusCode : ' + res.statusCode);
                }
            } else {
                if (res && res.statusCode) {
                    error = false;
                    logger.info('Response Status code : ' + res.statusCode);
                } else {
                    error = true;
                    logger.error('Request failure with no response');
                }
            }
            if (callback) {
                callback(error, res);
            }

        } catch (e) {
            logger.error(e.message);
            callback(true, null);
        }
    });
}

module.exports.requestApi = requestApi;