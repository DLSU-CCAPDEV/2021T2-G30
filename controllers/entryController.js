const db = require('../models/db.js');
const entryCollection = require('../models/EntryModel.js');
const userCollection = require('../models/UserModel.js');
const mongoose = require('mongoose');

const entryController = {

    createEntry: function (req, res){

        var entryTitle = req.body.entryTitle;
        var entryBody = req.body.entryBody;
        var significance = req.body.significance;
        var authorUserName = req.session.uName;
        var entryDate = req.body.entryDate;
        var privacy = req.body.privacy;
        var entryImage;

        if(req.files.length == 0) {
            entryImage = null;
        } else {
            entryImage = req.files[0].id;
        }
        
        var entry = {
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
            });
        });
    },

    editEntry: function(req, res) {

        var id = req.body.id;

        var entry = {
            entryTitle: req.body.entryTitle,
            entryBody: req.body.entryBody,
            significance: req.body.significance,
            entryDate: req.body.entryDate,
            privacy: req.body.privacy            
        }
        
        db.updateOne(entryCollection, {_id: id}, entry, function(flag) {
            if(flag)
                console.log('Successful edit');
            else 
                console.log('unsuccessful edit');
            res.send(true);
        })
    },

    deleteEntry: function(req, res) {
        var id = req.body.id;

        var update = {
            $pull: {
              entries: id
            }
          }
        
        db.deleteOne(entryCollection, {_id: id}, function(flag) {
            db.updateOne(userCollection, {uName: req.session.uName}, update, function(flag) {
                if(flag) 
                    console.log('Successfully updated ' + req.session.uName);
                res.send(true);
            })
        });
    }
};   

module.exports = entryController;