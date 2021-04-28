const db = require('../models/db.js');
const userCollection = require('../models/UserModel.js');
const multer = require('multer');

const profileController = {

    signup: function (req, res) {
        var dPicture = req.body.dPicture;
        var fName = req.body.fName;
        var lName = req.body.lName;
        var email = req.body.email;
        var uName = req.body.uName;
        var bio = req.body.bio;
        var pw = req.body.pw;

        var indivUser = {
            dPicture: dPicture,
            fName: fName,
            lName: lName,
            email: email,
            uName: uName,
            bio: bio,
            pw: pw
        }

        db.insertOne(userCollection, indivUser, function (flag) {

            if(flag) {
                res.redirect('/login');
            }
            else res.render('error');
        });

    },

    getProfile: function(req, res) {
        //query where 
        var query = {uName: req.params.uName};

        var projection = 'fName lName uName bio';
        // var projection = 'dPicture fName lName uName bio';

        db.findOne(userCollection, query, projection, function(result) {
            if(result != null) {
                // var result = {
                //     //dPicture: result.dPicture
                //     fName: result.fName,
                //     lName: result.lName,
                //     uName: result.uName,
                //     //friends: friends
                // };
                res.render('profile',  {
                    title: 'SafeSpace',
                    css: ['global','personalprofile'], 
                    details: result
                });
            } else {
                res.render('error', {
                    title: 'SafeSpace',
                    css: ['global','mainpage']
                });
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
        db.findOne(userCollection, {uName: uName, pw: pw}, '', function (result) {
            if(result === null)
                res.send(false);
            else 
                res.send(true);
                
        });
    },

    login: function(req,res){
        var uName = req.body.uName;
        var pw = req.body.pw;

        console.log('uName = ' + uName);
        console.log('pw =' + pw);
        db.findOne(userCollection, {uName: uName, pw: pw}, '', function (result) {
            console.log(result);
           req.session.uName = result.uName;

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
    }
    
    
};   

module.exports = routerController;