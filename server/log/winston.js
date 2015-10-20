var winston = require('winston');
var logRotate = require('winston-filerotatedate');
var config = require('../config/config.js');
var path = require('path');

var transports = [];
// Logging levels:
// silly: 0,
// debug: 1,
// verbose: 2,
// info: 3,
// warn: 4,
// error: 5
// Console stdout
if( config.log.console.enabled ) {
    transports.push(new (winston.transports.Console)({
        level: config.log.console.level,
        prettyPrint: true,
        json: false,
        timestamp: true,
        handleExceptions: true,
        colorize: config.log.console.colorize
    }));
}
// Rotating file - always write to one set filename but start a fresh file 
// every "maxsize" bytes
// and rename previous file with a timestamp
if (config.log.plaintext.enabled) {
    var logdir = config.log.plaintext.dirname;
    transports.push(new winston.transports.File({
        level: config.log.plaintext.level,
        prettyPrint: true,
        json: false,
        timestamp: true,
        handleExceptions: true,
        // File specific:
        filename: config.log.plaintext.filename,
        dirname: logdir,
        maxsize: config.log.plaintext.maxsize
    }));
}

//Audit Log
if(config.log.audit.enabled) {
    var logdir1 = config.log.audit.dirname || path.normalize(__dirname + '/../..');
    transports.push(new winston.transports.File({
        level: config.log.audit.level,
        prettyPrint: true,
        json: false,
        timestamp: true,
        handleExceptions: true,
        // File specific:
        filename: config.log.audit.filename,
        dirname: logdir1,
        maxsize: config.log.audit.maxsize
    }));
}

//Customized levels for audit logs
var myCustomLevels = {
    levels: {
        debug: 0,
        info: 1,
        warn: 2,
        error: 3,
        audit: 4
    },
    colors: {
        audit: 'green',
        debug: 'black',
        info: 'blue',
        warn: 'red',
        error: 'red'
    }
};
// Initialize and export logger module
var logger = new(winston.Logger)({
    transports: transports,
    exitOnError: true,
    levels: myCustomLevels.levels
});

module.exports = logger;