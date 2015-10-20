var couchbase = require("couchbase");
var config = require('../config/config.js');
var ViewQuery = couchbase.ViewQuery;
var N1qlQuery = couchbase.N1qlQuery;
var query = ViewQuery.from("dev_getAllUsers", 'getAllUsers');
var sqlQuery = N1qlQuery.fromString('SELECT * FROM ' + config.couchBaseLocal.bucketName);
var db;
var dbMsg;
var couchbaseConfig = config.couchBaseLocal;
function initDb(){
    var cluster = new couchbase.Cluster(couchbaseConfig.server);
    db = cluster.openBucket(couchbaseConfig.bucketName,couchbaseConfig.bucketPassword);
    dbMsg = cluster.openBucket(couchbaseConfig.msgBucketName,couchbaseConfig.msgBucketPassword);
}   

function getDb(){
    if(!db) {
        initDb();
    }
}

function getMultiUser(keys, callback) {
    getDb();        
    db.getMulti(keys, function(err, results) {
        callback(err, results);
    });
}

function getUser(key, callback) {
    getDb();        
    db.get(key, function(err, results) {
        callback(err, results);
    });    
}

function deleteUser(key, callback) {
    getDb();        
    db.remove(key, function(err, results) {
        callback(err, results);
    });    
}

function updateUser(key, val, callback) {
    getDb();        
    db.upsert(key, val, function(err, results) {
        callback(err, results);
    });    
}

function getAllUsers(callback) {
    getDb(); 
    db.query(query, function(err, res) {
        callback(err, res);
    });
}

function getAllDocuments(callback) {
    getDb(); 
    db.query(sqlQuery, function(err, res) {
        callback(err, res);
    });
}


module.exports.getUser = getUser;
module.exports.deleteUser = deleteUser;
module.exports.updateUser = updateUser;
module.exports.getAllUsers = getAllUsers;
module.exports.getAllDocuments = getAllDocuments;

