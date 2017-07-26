var async = require('async');
var constants = require('../other/Constants');
var fs = require('fs');
var util = require('util');
var MongoClient = require('mongodb').MongoClient
var mongoose = require('mongoose');

var DIR_PATH = '../seed';
var NAME_OF_FILE = 'surveyors';

function isFunction(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

function loadSeedFile(db, nameOfFile) {
    var fileContents = require(DIR_PATH + '/' + nameOfFile);

    if (isFunction(fileContents)) {
        // has returned a callback
        var callback = fileContents;
        callback(function (err, contents) {
            if (err) {
                console.log(err);
            } else {
                if (util.isArray(contents)) {
                    // has array contents
                    // process the contents of the file
                    saveIntoDB(db, contents, NAME_OF_FILE);
                }
            }
        });
    } else if (util.isArray(fileContents)) {
        // has array contents
        // process the contents of the file
        saveIntoDB(db, fileContents, NAME_OF_FILE);
    } else {
        console.log('Please provide a valid file');
        closeDatabase(db);
    }
}

function saveIntoDB(db, fileContents, fileName) {
    if (fileContents.length <= 0) {
        console.log("The fileContents should be a non-empty array.");
        return;
    }

    db.collection(fileName, { strict: true }, function (err, result) {
        if (!err) {
            dropCollection(db, fileName);
        }

        async.each(fileContents, function (fileContent, cb) {
            fileContent.save(function (err) {
                if (err) {
                    console.log('Failed to save the document into the collection ' + fileName + ' err : ' + err);
                }

                console.log('Successfully saved the document into the collection : ' + fileName);
                cb();
            });
        }, function (err) {
            if (err) {
                console.log('Failed to save the collection err : ' + err);
            }

            console.log('Completed inserting documents into the collection ' + fileName);

            closeDatabase(db);
            process.exit();
        });
    });
}

function createCollection(db, nameOfCollection) {
    db.createCollection(nameOfCollection, function (err, collection) {
        if (err) {
            console.log("Failed to create a collection: " + err);
            return null;
        } else {
            return collection;
        }
    });
}

function dropCollection(db, nameOfCollection) {
    db.dropCollection(nameOfCollection, function (err, result) {
        if (err) {
            console.log("Failed to drop the collection " + err);
        } else {
            console.log('Collection ' + nameOfCollection + ' dropped successfully');
            return result;
        }
    });
}

function closeDatabase(db) {
    console.log('Closed Database.');
    db.close();
}

// public function that helps to connect to the Database. 
function connectToDB() {
    MongoClient.connect(constants.clusterURL, function (err, db) {
        if (err) {
            console.log('Failed connecting to the Db. ' + err);
        } else {
            console.log('Connected to the Db.');

            mongoose.connect(constants.clusterURL);

            var mongooseDB = mongoose.connection;
            mongooseDB.on('error', function () {
                console.log('Failed to connect to mongoose.');
            });

            mongooseDB.once('open', function () {
                console.log('Connected to the mongoose DB');
                loadSeedFile(db, NAME_OF_FILE);
            })
        }
    });
}

module.exports = connectToDB;