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
        var entryDate = new Date(req.body.entryDate);
        var privacy = req.body.privacy;
        var entryImage;

        var currDate = new Date();
        var timePosted = currDate.getHours() * 10000;
        timePosted = timePosted + (currDate.getMinutes() * 100);
        timePosted = timePosted + (currDate.getSeconds());
        console.log(timePosted);

        if(req.files.length > 0) {
            entryImage = req.files[0].id;
        } else {
            entryImage = null;
        }

        var entry = {
            _id: mongoose.Types.ObjectId(),
            entryTitle: entryTitle,
            entryBody: entryBody,
            significance: significance,
            authorUserName: authorUserName,
            entryDate: entryDate,
            privacy: privacy,
            entryImage: entryImage,
            timePosted: timePosted
        }

        var update = {
            $push: {
              entries: entry._id
            }
          }

        db.insertOne(entryCollection, entry, function (flag) {
            db.updateOne(userCollection, {uName: authorUserName}, update, function(result) {
                if(result) {
                    res.render('partials/entry', {
                        entryImage: entry.entryImage,
                        entryBody: entry.entryBody,
                        entryDate: entry.entryDate,
                        entryTitle: entry.entryTitle,
                        privacy: entry.privacy,
                        _id: entry._id,
                        layout: false
                    }, function(err, rendered) {
                        if(err) {
                            console.log(err);
                        }
                        else {
                            //console.log(rendered);
                            res.send(rendered);
                        }
                    })
                } 
            });
        });
    },

    editEntry: function(req, res) {

        //console.log('edit reached here');

        var id = req.body.id;
        var entryDate = new Date(req.body.entryDate);

        var entry = {
            entryTitle: req.body.entryTitle,
            entryBody: req.body.entryBody,
            significance: req.body.significance,
            entryDate: entryDate.setHours(0, 0, 0),
            privacy: req.body.privacy,       
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