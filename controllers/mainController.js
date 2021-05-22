//const { replaceOne } = require("../models/UserModel");
const db = require('../models/db.js');
const entryCollection = require('../models/EntryModel.js');
const letterCollection = require('../models/LetterModel.js');
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

    getUserError: function (req, res) {
        //res.status(400);
        res.render('error', {
            title: '400 Bad Request',
            css:['global', 'error'],
            status: {
                code: "400",
                message: "User account has been deleted",
            },
            sessionUser: req.session.uName
        });
    },

    getMainPage: function(req, res) {
        
        if(req.session.uName){
            if(req.session.sortBy === 'date'){
                var sortMethod = 'date'
                var sortDB = {entryDate: -1, timePosted: -1};
            }
            else if(req.session.sortBy === 'significance') {
                var sortMethod = 'significance'
                var sortDB = {significance: -1, entryDate: -1, timePosted: -1};
            }
            db.findMany(entryCollection, {authorUserName: req.session.uName}, '', sortDB ,function(result) {
                var entries = [];

                for(var indivEntries of result) {
                    var entry = {
                        _id: indivEntries._id,
                        entryTitle: indivEntries.entryTitle,
                        entryBody: indivEntries.entryBody,
                        entryDate: indivEntries.entryDate,
                        significance: indivEntries.significance,
                        privacy: indivEntries.privacy,
                        entryImage: indivEntries.entryImage
                    };
                    entries.push(entry);
                }
                res.render('mainpage', {
                    title: 'Safe Space',
                    css: ['global','mainpage'],
                    entries: entries,
                    sortMethod: sortMethod,
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

    redirectUser: function(req, res) {
        //console.log('redirect');
        res.redirect('/mainpage');
    },

    changeSort: function(req, res) {

        if(req.session.sortBy === 'date') 
            req.session.sortBy = 'significance';
        else if(req.session.sortBy === 'significance') 
            req.session.sortBy = 'date';

        res.send(true);
    },

    geteditProfileAccount: function(req, res){
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

        if(SessionUName != null){
            if(SessionUName === SearchTitle){
                db.findMany(userCollection, {uName: SearchTitle}, '', {uName: -1}, function(SessionUser){
                    db.findMany(entryCollection, {entryTitle: SearchTitle, authorUserName: SessionUName}, '', {entryDate: -1}, function(result){
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
                                query: SearchTitle,
                                sessionUser: req.session.uName
                            });
                        }
                    }, {entryDate: -1})
                });
            }
            else{
                db.findMany(userCollection,{uName: SearchTitle},'', {uName: -1}, function(people){
                    db.findMany(entryCollection, {entryTitle: SearchTitle, authorUserName: SessionUName}, '', {entryDate: -1}, function(result){
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
        }
        else{
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
        /*
        if(req.query.SearchTitle != req.session.uName)
            SearchTitle = req.query.SearchTitle;
        else
            SearchTitle = "";
        */
        // console.log(SearchTitle);

    },

    getEntry: function(req, res){

        var EntryId = req.params._id;
        
        db.findOne(entryCollection, {_id: EntryId}, '',function(entryResult){
                if(entryResult){
                    db.findOne(userCollection, {uName: req.session.uName}, '', function(result) {
                            if(req.session.uName === entryResult.authorUserName)
                                var userOwner = true;
                            else if (entryResult.authorUserName === null)
                                var userOwner = false;
                            else 
                                var userOwner = false;
                            

                            if(userOwner){    
                                res.render('searchentry',{
                                    title: 'Individual entry',
                                    css: ['global','entry-webpage'],
                                    entries: entryResult,
                                    sessionUser: req.session.uName,
                                    userOwner: userOwner
                                });
                            }
                            else{
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

                    });
                }
                else{
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
        });
    },

    getLetter: function(req, res) {
        var LetterId = req.params._id;

        db.findOne(letterCollection, {_id: LetterId}, '',function(letterResult){
            db.findOne(userCollection, {uName: req.session.uName}, '', function(result) {
                if(result) {
                    if(req.session.uName === letterResult.recipient)
                        var recipient = true;
                    else 
                        var recipient = false;

                    res.render('indivletter', {
                        title: 'Individual letter',
                        css: ['global','entry-webpage'],
                        letter: letterResult,
                        sessionUser: req.session.uName,
                        recipient: recipient
                    });
                }
            });
        });
    }
};   

module.exports = mainController;