//const { replaceOne } = require("../models/UserModel");
const db = require('../models/db.js');
const entryCollection = require('../models/EntryModel.js');
const userCollection = require('../models/UserModel.js');
const mongoose = require('mongoose');

const mainController = {

    getLogin: function (req, res) {
        res.render('login', {
            title: 'login',
            css: ['global']
        });
    },

    getError: function (req, res) {
        res.render('error', {
            title: 'Page not found',
            css:['global', 'error']
        });
    },

    getMainPage: function (req, res){

        // Checks for login user (VERY IMPORTANT)
        if(req.session.uName != null){
            console.log(req.session.uName);
        }

        res.render('mainpage', {
            title: 'SafeSpace',
            css: ['global','mainpage'],
            entries: [
                { entryTitle: 'Title 1', entryBody: 'Body 1', entryDate: 'June 14, 2012' }, 
                { entryTitle: 'Title 2', entryBody: 'Body 2', entryDate: 'April 28, 2021' }
            ]
        });
    },

    mainPageEntry: function (req, res){

        var title = req.query.title;
        var body = req.query.body;
        var significance = req.query.significance;
        var authorUserName = req.session.uName;
        var date = req.query.date;
        var privacy = req.query.privacy;

        entry = {
            _id: mongoose.Types.ObjectId(),
            title: title,
            body: body,
            significance: significance,
            authorUserName: authorUserName,
            date: date,
            privacy: privacy
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

    getSettingsPage: function (req, res){
        res.render('settings',{
            title: 'Settings',
            css: ['global','settings']
        });
    }
    
};   

module.exports = mainController;