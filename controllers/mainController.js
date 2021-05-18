//const { replaceOne } = require("../models/UserModel");
const db = require('../models/db.js');
const entryCollection = require('../models/EntryModel.js');
const userCollection = require('../models/UserModel.js');
const mongoose = require('mongoose');

const mainController = {

    getLogin: function (req, res) {
        
        if(req.session.uName) {
            res.redirect('/mainpage');
        }
        else {
            res.render('login', {
                title: 'Login',
                css: ['global']
            });
        }
        
    },

    getError: function (req, res) {
        res.status(400);
        res.render('error', {
            title: '400 Bad Request',
            css:['global', 'error'],
            status: {
                code: "400",
                message: "Bad request"
            } 
            
        });
    },

    getMainPage: function(req, res) {
        console.log('Your username is ' + req.session.uName)
        if(req.session.uName){
            
            db.findMany(entryCollection, {authorUserName: req.session.uName}, '', function(result) {
                var entries = [];

                for(var indivEntries of result) {
                    var entry = {
                        _id: indivEntries._id,
                        entryTitle: indivEntries.entryTitle,
                        entryBody: indivEntries.entryBody,
                        entryDate: indivEntries.entryDate,
                        significance: indivEntries. significance,
                        privacy: indivEntries.privacy,
                        entryImage: indivEntries.entryImage
                    };
                    entries.push(entry);
                }
                res.render('mainpage', {
                    title: 'Safe Space',
                    css: ['global','mainpage'],
                    entries: entries,
                    sessionUser: req.session.uName
                });
            })
        }
        else {
            res.status(401);
            res.render('error', {
                title: '401 Unauthorized Access',
                css:['global', 'error'],
                status: {
                    code: "401",
                    message: "Unauthorized access."
                } 
                
            });
        }
    },


    geteditProfileAccount: function(req,res){
        //console.log("Session: " + req.session.uName);
        
        if(req.session.uName) {
            db.findOne(userCollection, {uName: req.session.uName},'',function (result){
                res.render('editaccount',{
                    title: 'EditAccount',
                    css: ['global','settings'],
                    user: result,
                    sessionUser: req.session.uName
                });
            });
        } else {
            res.status(401);
            res.render('error', {
                title: '401 Unauthorized Access',
                css:['global', 'error'],
                status: {
                    code: "401",
                    message: "Unauthorized access."
                } 
                
            });
        }
    },

    // settings page
    getSettingsPage: function (req, res) {
        if(req.session.uName) {
            db.findOne(userCollection, {uName: req.session.uName},'',function (result){
                res.render('settings',{
                    title: 'Settings',
                    css: ['global','settings'],
                    user: result,
                    sessionUser: req.session.uName
                });
            });
        } else {
            res.status(401);
            res.render('error', {
                title: '401 Unauthorized Access',
                css:['global', 'error'],
                status: {
                    code: "401",
                    message: "Unauthorized access."
                } 
                
            });
        }
    },

    //gets picture
    getPicture: function(req, res) {
        var id = mongoose.Types.ObjectId(req.params.id);
        db.openDownloadStream(id, function (downloadStream){
            if(downloadStream == null) {
                res.status(404);
                res.render('error', {
                    title: '404 Not found',
                    css:['global', 'error'],
                    status: {
                        code: "404",
                        message: "Not found"
                    } 
                    
                });
            } else {
                downloadStream.pipe(res);
            }   
        });
    },

    getSearch: function(req,res){
        // console.log('im in');
        var SearchTitle = req.query.SearchTitle; 
        var SessionUName = req.session.uName;

        if(SessionUName === SearchTitle){
            db.findMany(userCollection, {uName: SearchTitle}, '',function(SessionUser){
                db.findMany(entryCollection, {entryTitle: SearchTitle, authorUserName: SessionUName}, '',function(result){
                    if(result.length !== 0 || SessionUser.length !== 0){
                        //console.log('Search results success');
                        res.render('searchresults',{
                            title: 'Search Results',
                            css: ['global','searchresults'],
                            SessionUser: SessionUser,
                            entries: result,
                            sessionUser: req.session.uName
                        });
                    } else {
                        res.render('notfound', {    
                            title: 'No Results Found',
                            css: ['global','searchresults'],
                            query: SearchTitle 
                        });
                    }
                }, {entryDate: -1})
            });
        }
        else{
            db.findMany(userCollection,{uName: SearchTitle},'',function(people){
                db.findMany(entryCollection, {entryTitle: SearchTitle, authorUserName: SessionUName}, '',function(result){
                    if(result.length !== 0 || people.length !== 0){
                        //console.log('Search results success');
                        res.render('searchresults',{
                            title: 'Search Results',
                            css: ['global','searchresults'],
                            people: people,
                            entries: result,
                            sessionUser: req.session.uName
                        });
                    } else {
                        res.render('notfound', {    
                            title: 'No Results Found',
                            css: ['global','searchresults'],
                            query: SearchTitle 
                        });
                    }
                }, {entryDate: -1})
            });
        }
        /*
        if(req.query.SearchTitle != req.session.uName)
            SearchTitle = req.query.SearchTitle;
        else
            SearchTitle = "";
        */
        // console.log(SearchTitle);

    },

    getEntry: function(req,res){

        //console.log('getting entry');
        var EntryId = req.params._id;
        // I'm sending as a path parameter instead of a query parameter
        //console.log(EntryId);
        db.findOne(entryCollection,{_id: EntryId},'',function(result){
            if(result){
                //console.log('entry found, refreshing');
                res.render('searchentry',{
                    title: 'Entry Results',
                    css: ['global','entry-webpage'],
                    entries: result,
                    sessionUser: req.session.uName
                });
            }
        })
    }
    
};   

module.exports = mainController;