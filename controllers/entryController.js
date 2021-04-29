//const { replaceOne } = require("../models/UserModel");
const db = require('../models/db.js');
const entryCollection = require('../models/EntryModel.js');
const userCollection = require('../models/UserModel.js');
const mongoose = require('mongoose');

const entryController = {

    mainPageEntry: function (req, res){

        var entryTitle = req.body.entryTitle;
        var entryBody = req.body.entryBody;
        var significance = req.body.significance;
        var authorUserName = req.session.uName;
        var entryDate = req.body.entryDate;
        var privacy = req.body.privacy;
        var entryImage = req.file.id;

        if(0 == req.files.length) {
            entryImage = null;
            console.log("picture is empty"); 
        } else {
            entryImage = req.files[0].id;
        }
        
        entry = {
            _id: mongoose.Types.ObjectId(),
            entryTitle: entryTitle,
            entryBody: entryBody,
            significance: significance,
            authorUserName: authorUserName,
            entryDate: entryDate,
            privacy: privacy,
            entryImage: entryImage
        }

        var update = {
            $push: {
              entries: entry._id
            }
          }

        db.insertOne(entryCollection, entry, function (flag) {
            db.updateOne(userCollection, {uName: authorUserName}, update, function(flag) {
                if(flag)
                    console.log('Successfully updated ' + authorUserName);
                res.redirect('/mainpage');
            })
        });
    },

    deleteEntry: function(req, res) {
        var id = req.body.id;

        var update = {
            $pull: {
              entries: entry._id
            }
          }
        
        db.deleteOne(entryCollection, {_id: id}, function(flag) {
            db.updateOne(userCollection, {uName: req.session.uName}, update, function(flag) {
                if(flag) 
                    console.log('Successfully updated ' + req.session.uName);
                res.redirect('/mainpage');
            })
        });
    }
    
};   

module.exports = entryController;