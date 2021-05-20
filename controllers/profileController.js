const db = require('../models/db.js');
const userCollection = require('../models/UserModel.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const {validationResult} = require('express-validator');


const profileController = {

    signup: function (req, res) {
        // console.log("im in");
        var dPicture;
        if(req.files.length == 0) {
            dPicture = null;
        } else {
            dPicture = req.files[0].id;
        }
        
        var fName = req.body.fName;
        var lName = req.body.lName;
        var email = req.body.email;
        var uName = req.body.uName;
        var bio = req.body.bio;
        var pw = req.body.pw;
        var memoryenabler = true;

        var errors = validationResult(req);
        
        //If there are validation errors
        if (!errors.isEmpty()) {
            errors = errors.errors;
            
             /*
                for each error, store the error inside the object `details`
                the field is equal to the parameter + `Error`
                the value is equal to `msg` as defined in the validation middlewares

                for example, if there is an error for parameter `fName`:
                store the value to the field `fNameError`
            */
            var details = {};
            for(var i = 0; i < errors.length; i++) {
                details[errors[i].param + "Error"] = errors[i].msg;
            }
            res.render('login', {
                title: 'Error in Signing Up',
                css: ['global'],
                errDetails: details,
                errorCreds: true
            });

        } else {
            
            //check if email is already taken
            var query = {email: email};
            var projection = 'email';
            db.findOne(userCollection, query, projection, function(userEmail) {
                
                // If email is unique
                if(userEmail == null) { 
                    var invalidUsername = uName.includes(" "); //check if there is space between the username
                    if(!invalidUsername) {
                        db.findOne(userCollection, {uName: uName}, 'userName', function(userUName) {
                            if(userUName == null) { //if unique username
                                console.log("Username is unique");
                                bcrypt.hash(pw, saltRounds, function(err, hash) {
                                    var indivUser = {
                                        dPicture: dPicture,
                                        fName: fName,
                                        lName: lName,
                                        email: email,
                                        uName: uName,
                                        bio: bio,
                                        pw: hash,
                                        memoryenabler: memoryenabler
                                    }
                                    
                                    // Insert data to db
                                    db.insertOne(userCollection, indivUser, function (flag) {
                                        if(flag) {
                                            res.redirect('/login');
                                        }
                                        else { 
                                            res.status(500);
                                            res.render('error', {
                                                title: '500  Internal Server Error',
                                                css:['global', 'error'],
                                                status: {
                                                    code: "500",
                                                    message: "Something unexpected happened."
                                                }  
                                            });   
                                        }    
                                    });
                                });
                            } else { //else username is not unique
                                res.render('login', {
                                    title: 'Error in Signing Up',
                                    css: ['global'],
                                    errorCreds: true
                                });
                                
                            }
                        });
                    } else {
                        res.render('login', {
                            title: 'Error in Signing Up',
                            css: ['global'],
                            errorCreds: true
                        });
                    }
                } else {
                    res.render('login', {
                        title: 'Error in Signing Up',
                        css: ['global'],
                        errorCreds: true
                    });
                }
            });
        }
    },

    getProfile: function(req, res) {
        var query = {uName: req.params.uName};
        //var projection = 'dPicture fName lName uName bio friendsList';
        db.findOne(userCollection, query, '', function(result) {
            db.findOnePopulate(userCollection, query, '', {path: 'friendsList.friendId', model: 'User'}, function(populateResult) {
                if(populateResult) {

                    //console.log(populateResult.friendsList);
    
                    res.render('profile', {
                        title: 'SafeSpace',
                        css: ['global', 'personalprofile'],
                        JSbool: false,
                        details: result,
                        friends: populateResult.friendsList,
                        sessionUser: req.session.uName
                    });
    
                } else {
                    res.status(400);
                    res.render('error', {
                        title: '400 Bad Request',
                        css:['global', 'error'],
                        status: {
                            code: "400",
                            message: "Bad request"
                        }
                    });
                }
            });    
        });
    },
    
    
    checksignup: function (req, res) {
        var uName = req.query.uName;
        // console.log("test");
        db.findOne(userCollection, {uName: uName}, '', function (result) {
            res.send(result);
        });
    },

    //Check email to be sent back to the ajax
    checkemail: function (req, res) {
        var email = req.query.email;
        db.findOne(userCollection, {email: email}, '', function(result) {
            res.send(result);
        });
    },

    //Check email to be sent back to the ajax
    editCheckEmail: function (req, res) {
        var email = req.query.email;
        var sessionUser = req.session.uName;

        console.log("hello");
        db.findOne(userCollection, {email: email}, '', function(result) {

            if(result != null){
                if(result.uName === sessionUser && result.email === email){
                res.send(true);
                }
                else{
                res.send(false);
                }
            }
            else
            res.send(true);
        });
    },

    checklogin: function (req, res) {
        var uName = req.query.uName;
        var pw = req.query.pw;

        db.findOne(userCollection, {uName: uName}, 'pw', function (result) {
            if(result === null)
                res.send(false);
            else {
                bcrypt.compare(pw, result.pw, function(err, equal) {
                    if(equal) {
                        res.send(true);
                    }  
                    else {
                        res.send(false);
                    }
                });  
            }     
        });
    },


    login: function(req, res){
        var uName = req.body.uName;
        var pw = req.body.pw;
        var errors = validationResult(req);

        if(!errors.isEmpty()) {
            errors = errors.errors;
            var details = {};
            for(var i = 0; i < errors.length; i++) {
                details[errors[i].param + "Error"] = errors[i].msg;
            }
            res.render('login', {
                title: "Error in Logging in",
                css: ['global'],
                errorLogin: "Invalid Login Credentials"
            });
        } else {
            db.findOne(userCollection, {uName: uName}, '', function (result) {
               // Bookmark
               console.log("Value in db: " + result);
               req.session.sortBy = 'date';
               req.session.uName = result.uName;
               req.session.pw = result.pw;
               res.redirect('/mainpage');
            });
        }
    },

    getLogout: function(req,res){
        
        req.session.destroy(function(error){
            if(error){
                res.status(400);
                res.render('error', {
                    title: '400 Bad Request',
                    css:['global', 'error'],
                    status: {
                        code: "400",
                        message: "Bad request"
                    } 
                    
                });
                throw error;
            }
            else
                res.redirect('/login');
        })
    },

    editAccount: function (req, res) {
        
        var dPicture;
        var uName = req.session.uName;
        var pw = req.body.pw; // the password changed
        var errors = validationResult(req);

        console.log("password in session at editAccount: " + pw);
        if(req.files.length == 0) {
            dPicture = null;
        } else {
            dPicture = req.files[0].id;
        }
        
        console.log("dPicture id is = " + dPicture);

        if(!errors.isEmpty()){
            errors = errors.errors;
            
             /*
                for each error, store the error inside the object `details`
                the field is equal to the parameter + `Error`
                the value is equal to `msg` as defined in the validation middlewares

                for example, if there is an error for parameter `fName`:
                store the value to the field `fNameError`
            */
            var details = {};
            for(var i = 0; i < errors.length; i++) {
                details[errors[i].param + "Error"] = errors[i].msg;
            }
            res.render('settings', {
                title: 'Settings',
                css: ['global','settings'],
                errDetails: details,
                errorCreds: true
            });
        }
        else{
            if(pw !== "" && dPicture != null){
                bcrypt.hash(pw, saltRounds, function(err, hash) {
                    var indivUser = {
                        dPicture: dPicture,
                        fName: req.body.fName,
                        lName: req.body.lName,
                        email: req.body.email,
                        bio: req.body.bio,
                        pw: hash,
                    }
                    console.log("changed current password: " + hash);
                    
                    db.updateOne(userCollection, {uName: uName}, indivUser, function(update){
                        console.log("update: " + update);
                        if(update){
                            res.redirect('/settings');
                        }
                    });
                });
            }
            else if(pw === "" && dPicture == null){
                var indivUser = {
                    fName: req.body.fName,
                    lName: req.body.lName,
                    email: req.body.email,
                    bio: req.body.bio,
                }
                
                db.updateOne(userCollection, {uName: uName}, indivUser, function(update){
                    console.log("update: " + update);
                    if(update){
                        res.redirect('/settings');
                    }
                });
            }
            else if(pw !== "" && dPicture == null){
                bcrypt.hash(pw, saltRounds, function(err, hash) {
                    var indivUser = {
                        fName: req.body.fName,
                        lName: req.body.lName,
                        email: req.body.email,
                        bio: req.body.bio,
                        pw: hash,
                    }
                    console.log("changed current password: " + hash);
                    
                    db.updateOne(userCollection, {uName: uName}, indivUser, function(update){
                        console.log("update: " + update);
                        if(update){
                            res.redirect('/settings');
                        }
                    });
                });
            }
            else if(pw === "" && dPicture != null){

                    var indivUser = {
                        dPicture: dPicture,
                        fName: req.body.fName,
                        lName: req.body.lName,
                        email: req.body.email,
                        bio: req.body.bio,
                    }
                    
                    db.updateOne(userCollection, {uName: uName}, indivUser, function(update){
                        console.log("update: " + update);
                        if(update){
                            res.redirect('/settings');
                        }
                    });
            }
        }

        
    },

    enableMemories: function(req,res){
        var uName = req.session.uName;

        var memoryenabler = true;

        var indivUser = {
            memoryenabler:memoryenabler,
        }


        db.updateOne(userCollection, {uName: uName}, indivUser, function(result){
            if(result)
            res.redirect('/settings');
        });

    },

    disableMemories: function(req,res){
        var uName = req.session.uName;

        var memoryenabler = false;
        console.log("I am here");
        console.log(uName + "= Sesison name");
        var indivUser = {
            memoryenabler : memoryenabler,
        }

        db.updateOne(userCollection, {uName: uName}, indivUser, function(result){
            if(result)
            res.redirect('/settings');
        });
    },

    deleteaccount: function(req,res){

        var uName = req.session.uName;

        db.deleteOne(userCollection, {uName: uName},function(deleted) {
            console.log(deleted);
            req.session.destroy(function(error){
                if(error){
                    throw error;
                }
                else
                    res.redirect('/login');
            })
        })
    }
};   

module.exports = profileController;