//const { replaceOne } = require("../models/UserModel");
const db = require('../models/db.js');
const EntryModel = require('../models/EntryModel.js');
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
            css:['global', 'error'],
            sessionUser: req.session.uName
        });
    },

    getMainPage: function (req, res){

        // Checks for login user (VERY IMPORTANT)
        if(req.session.uName != null){
            //console.log(req.session.uName);
        }

        db.findMany(EntryModel, {authorUserName: req.session.uName}, '', function(result) {

            res.render('mainpage', {
                title: 'SafeSpace',
                css: ['global','mainpage'],
                entries: result,
                sessionUser: req.session.uName
            });
        }, {entryDate: -1})
    },

    getSettingsPage: function (req, res){
        

        db.findOne(userCollection, {uName: req.session.uName}, '', function (result) {
            // console.log(result);
            res.render('settings',{
                title: 'Settings',
                css: ['global','settings'],
                user: result,
                sessionUser: req.session.uName
            });
                 
        });
        

    },

    geteditProfileAccount: function(req,res){
        db.findOne(userCollection, {uName: req.session.uName},'',function (result){
            res.render('editaccount',{
                title: 'EditAccount',
                css: ['global','settings'],
                user: result,
                sessionUser: req.session.uName
            });
        });

    },

    //get picture
    getPicture: function(req, res) {
        var id = mongoose.Types.ObjectId(req.params.id);
        db.openDownloadStream(id, function (downloadStream){
            if(downloadStream == null) {
                res.status(404);
                res.render('error', {
                    title: 'Page not found',
                    css:['global', 'error']
                });
            } else {
                downloadStream.pipe(res);
            }   
        });
    }
    
};   

module.exports = mainController;