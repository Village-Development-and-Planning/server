var async = require('async');
var constants = require('./Constants');
var fs = require('fs');
var util = require('util');
var MongoClient = require('mongodb').MongoClient
var mongoose = require('mongoose');

var DIR_PATH = "./seed";

function loadSeedFiles(db) {
    fs.readdir(DIR_PATH, function(err, files) {
        if (err) {
            console.log('Error reading files from ' + DIR_PATH);
        } else {
            console.log('Reading files from ' + DIR_PATH);

            if (files.length <= 0) {
                console.log('No files inside ' + DIR_PATH);
            } else { 
                async.each(files, function(file, cb){
                    var fileContents = require(DIR_PATH + '/' + file);

                    if (!util.isArray(fileContents)) {
                        cb('File failed: ' + file);
                    } else {
                        // process the contents of the file
                        saveIntoDB(db, fileContents, file.slice(0, -3));
                        cb();
                    }

                }, function(err) {
                    if (err) {
                        console.log(err);
                        return;   
                    }
                });
            }
        }
    });
}

function saveIntoDB(db, fileContents, fileName) {
    if (fileContents.length <= 0) {
        console.log("The fileContents should be a non-empty array.");
        return;
    }

    db.collection(fileName, {strict: true}, function(err, result) {
        if (!err) {
            dropCollection(db, fileName);
        }

        async.each(fileContents, function(fileContent, cb){
            fileContent.save(function(err) {
                if (err) {
                    console.log('Failed to save the document into the collection ' + fileName + ' err : ' + err);
                }

                console.log('Successfully saved the document into the collection : ' + fileName);
                cb();
            });
        }, function(err) {
            if (err) {
                console.log('Failed to save the collection err : ' + err);
            }

            console.log('Completed inserting documents into the collection ' + fileName);
        });
    });

    // // insert all the documents into the collection.
    // db.collection('inserts').insertMany(fileContents, function(err, r) {
    //     if (err) {
    //         console.log('Failure inserting the file ' + fileName + ' into the db.');
    //     } else {
    //           if (fileContents.length == r.insertedCount) {
    //               console.log('Documents inserted into the collection ' + fileName + ' successfully');
    //           }
    //     }
    // });
}

function createCollection(db, nameOfCollection) {
    db.createCollection(nameOfCollection, function(err, collection) {
        if (err) {
            console.log("Failed to create a collection: " + err);
            return null;
        } else {
            return collection;
        }
    });
}

function dropCollection(db, nameOfCollection) {
    db.dropCollection(nameOfCollection, function(err, result) {
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
    MongoClient.connect(constants.clusterURL, function(err, db) {
        if (err) {
            console.log('Failed connecting to the Db. ' + err);
        } else {
            console.log('Connected to the Db.');

            mongoose.connect(constants.clusterURL);

            var mongooseDB = mongoose.connection;
            mongooseDB.on('error', function() {
                console.log('Failed to connect to mongoose.');
            });

            mongooseDB.once('open', function() {
                console.log('Connected to the mongoose DB');
                loadSeedFiles(db);
            })
        }
    });
}

//Todo: remove this
connectToDB();

module.exports = connectToDB;