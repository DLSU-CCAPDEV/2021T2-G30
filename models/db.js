
const mongoose = require('mongoose');
const User = require('./UserModel.js');
const dotenv = require('dotenv');

//const url = 'mongodb://localhost:27017/safespacedb';
const url = process.env.DB_URL;

const crypto = require("crypto");
const path = require("path");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
var GridFsBucket; 

dotenv.config();

// const url = process.env.DB_URL;

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};

// Storage
const storage = new GridFsStorage({
    url: url,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString("hex") + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: "uploads"
          };
          resolve(fileInfo);
        });
      });
    }
  });
  
const upload = multer({storage});


// defines an object which contains necessary database functions
const database = {

    //multer
    upload: upload,
    /*
        connects to database
    */
    connect: function () {
        mongoose.connect(url, options, function(error) {
            if(error) {
                throw error;
            }
            console.log('Connected to: ' + url);
            GridFsBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
                bucketName: "uploads"
            });
        }); 
    },

    /*
        inserts a single `doc` to the database based on the model `model`
    */
    insertOne: function(model, doc, callback) {
        model.create(doc, function(error, result) {
            if(error) {
                console.log(error);
                return callback(false);
            } 
            console.log('Added ' + result);
            return callback(true);
        });
    },

    /*
        inserts multiple `docs` to the database based on the model `model`
    */
    insertMany: function(model, docs, callback) {
        model.insertMany(docs, function(error, result) {
            if(error) return callback(false);
            console.log('Added ' + result);
            return callback(true);
        });
    },

    /*
        searches for a single document based on the model `model`
        filtered through the object `query`
        limits the fields returned based on the string `projection`
        callback function is called after the execution of findOne() function
    */
    findOne: function(model, query, projection, callback) {
        model.findOne(query, projection).lean().exec(function(error, result) {
            if(error) return callback(null);
            return callback(result);
        });
    },

    findOnePopulate: function(model, query, projection, path, callback) {
        model.findOne(query, projection).populate(path).lean().exec(function(err, result) {
            if(err) {
                console.log(err);
                return callback(null);
            }
            return callback(result);
        });
    },

    /*
        searches for multiple documents based on the model `model`
        filtered through the object `query`
        limits the fields returned based on the string `projection`
        callback function is called after the execution of findMany() function
    */
    findMany: function(model, query, projection, sort, callback) {
        model.find(query, projection).lean().sort(sort).exec(function(error, result) {
            if(error) return callback(false);
            return callback(result);
        });
    },

    /*
        updates the value defined in the object `update`
        on a single document based on the model `model`
        filtered by the object `filter`
    */
    updateOne: function(model, filter, update, callback) {
        model.updateOne(filter, update, function(error, result) {
            if(error) return callback(false);
            console.log('Document modified: ' + result.nModified);
            return callback(true);
        });
    },

    /*
        updates the value defined in the object `update`
        on multiple documents based on the model `model`
        filtered using the object `filter`
    */
    updateMany: function(model, filter, update, callback) {
        model.updateMany(filter, update, function(error, result) {
            if(error) return callback(false);
            console.log('Documents modified: ' + result.nModified);
            return callback(true);
        });
    },

    /*
        deletes a single document based on the model `model`
        filtered using the object `conditions`
    */
    deleteOne: function(model, conditions, callback) {
        model.deleteOne(conditions, function (error, result) {
            if(error) return callback(false);
            console.log('Document deleted: ' + result.deletedCount);
            return callback(true);
        });
    },

    /*
        deletes multiple documents based on the model `model`
        filtered using the object `conditions`
    */
    deleteMany: function(model, condition, callback) {
        model.deleteMany(condition, function (error, result) {
            if(error) return callback(false);
            console.log('Document deleted: ' + result.deletedCount);
            return callback(true);
        });
    },

    openDownloadStream: function(id, callback) {
        callback(GridFsBucket.openDownloadStream(id));
    }

}

/*
    exports the object `database` (defined above)
    when another script exports from this file
*/
module.exports = database;
