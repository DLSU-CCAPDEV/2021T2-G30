//const { replaceOne } = require("../models/UserModel");
const db = require('../models/db.js');
const entryCollection = require('../models/EntryModel.js');
const userCollection = require('../models/UserModel.js');
const mongoose = require('mongoose');

const entryController = {

    mainPageEntry: function (req, res){

        var entryTitle = req.query.entryTitle;
        var entryBody = req.query.entryBody;
        var significance = req.query.significance;
        var authorUserName = req.session.uName;
        var entryDate = req.query.entryDate;
        var privacy = req.query.privacy;
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
    
};   

module.exports = entryController;