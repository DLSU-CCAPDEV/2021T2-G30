const db = require('../models/db.js');
const userCollection = require('../models/UserModel.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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

        // console.log(dPicture);
        bcrypt.hash(pw, saltRounds, function(err, hash) {
            var indivUser = {
                dPicture: dPicture,
                fName: fName,
                lName: lName,
                email: email,
                uName: uName,
                bio: bio,
                pw: hash
            }
    
            db.insertOne(userCollection, indivUser, function (flag) {
                if(flag) {
                    console.log("successfully inserted");
                    res.redirect('/login');
                }
                else {
                    console.log("may error");
                    res.redirect('/error');
                    
                }
                    
            });
        });
        

    },

    getProfile: function(req, res) {
        //query where 
        var query = {uName: req.params.uName};
        var projection = 'dPicture fName lName uName bio';

        db.findOne(userCollection, query, projection, function(result) {
            
            if(result != null) {
                res.render('profile',  {
                    title: 'SafeSpace',
                    css: ['global','personalprofile'], 
                    details: result,
                    sessionUser: req.session.uName
                });
            } else {
                //console.log('error');
                res.status(404);
                res.redirect('/error');
            }
        });
    },
    
    checksignup: function (req, res) {
        var uName = req.query.uName;
        // console.log("test");
        db.findOne(userCollection, {uName: uName}, '', function (result) {
            res.send(result);
        });
    },

    checklogin: function (req, res) {
        var uName = req.query.uName;
        var pw = req.query.pw;

        // console.log("test");
        db.findOne(userCollection, {uName: uName}, 'pw', function (result) {
            if(result === null)
                res.send(false);
            else {
                bcrypt.compare(pw, result.pw, function(err, equal) {
                    console.log("Password: " + pw );
                    console.log("password in db: " + result.pw);
                    if(equal) {
                        console.log("equal");
                        res.send(true);
                    }  
                    else {
                        console.log("not equal");
                        res.send(false);
                    }
                });  
            }     
        });
    },

    login: function(req,res){
        var uName = req.body.uName;
        var pw = req.body.pw;

        console.log('uName = ' + uName);
        console.log('pw = ' + pw);
        
        db.findOne(userCollection, {uName: uName, pw: pw}, '', function (result) {
           console.log(result);

           // Bookmark
           req.session.uName = result.uName;
           req.session.pw = result.pw;
           console.log("logging in password: " + result.pw);
           res.redirect('/mainpage');  
        });
    },

    getLogout: function(req,res){
        
        req.session.destroy(function(error){
            if(error){
                res.render('error');
            }
            else
                res.redirect('/login');
        })
    },

    editAccount: function (req, res) {
        
        var dPicture;
        var uName = req.session.uName;
        var pw = req.body.pw; // the password changed

        console.log("password in session at editAccount: " + pw);
        if(req.files.length == 0) {
            dPicture = null;
        } else {
            dPicture = req.files[0].id;
        }
        
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
                if(update != null){
                    res.redirect('/settings');
                }
            });
        });
        
    },

    deleteaccount: function(req,res){

        var uName = req.session.uName;

        db.deleteOne(userCollection, {uName: uName},function(deleted){

            console.log(deleted);
            req.session.destroy(function(error){
                if(error){
                    res.render('error');
                }
                else
                    res.redirect('/login');
            })
        })
    }
};   

module.exports = profileController;