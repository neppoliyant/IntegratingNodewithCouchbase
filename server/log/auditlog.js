var request = require("request");
var logger = require('../log/winston');



doAuditLog = function (req, responsedata) {
    var useragent = null;
    var deviceID = null;
    var uid = null;
    var uid = req.params.id || req.body || req.query.id;
    logger.debug("Request headers :" + req.headers);
    var customurl = req['host'] + req['originalUrl'];
    for (var item in req.headers) {
        if (item === 'authorization') {
            authheader = req.headers[item];
        } else if (item === 'user-agent') {
            useragent = req.headers[item];
        } else if (item === 'device-id') {
            deviceID = req.headers[item];
        }
    }
    var array = useragent.split("/");
    var auditlogger = {};
    logger.info("Array :" + array);
    if (array.length > 0) {
        auditlogger.clientOs = array[0];
        auditlogger.deviceType = array[1];
        auditlogger.deviceModel = array[2];
        auditlogger.osVersion = array[3];
        auditlogger.clientVersion = array[5];
        auditlogger.deviceID = deviceID;
        auditlogger.uid = uid;
        auditlogger.customurl = customurl;
        auditlogger.protocol = req['protocol'];
        auditlogger.originalMethod = req['originalMethod'];
        auditlogger.responsedata = responsedata;
        write(auditlogger);
    }
};

write = function(auditlogger) {
    logger.audit("resourceRequest=" + auditlogger.customurl + ", protocol=" + auditlogger.protocol + ", httpMethod=" + auditlogger.originalMethod + ", deviceType=" + auditlogger.deviceType + ", deviceModel=" + auditlogger.deviceModel + ", osVersion=" + auditlogger.osVersion
        + ", clientVersion=" + auditlogger.clientVersion + ", clientOs=" + auditlogger.clientOs + ", deviceId=" + auditlogger.deviceID +
        ", userId=" + auditlogger.uid + ", responseData[" + auditlogger.responsedata + "]");

};

module.exports.auditlog = doAuditLog;