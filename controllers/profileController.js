const db = require('../models/db.js');
const userCollection = require('../models/UserModel.js');

const profileController = {

    signup: function (req, res) {
        // console.log("im in");
        var dPicture;
        if(req.files.length == 0) {
            dPicture = null;
            console.log("picture is empty"); 
        } else {
            dPicture = req.files[0].id;
        }
        
        console.log(dPicture);
        var fName = req.body.fName;
        var lName = req.body.lName;
        var email = req.body.email;
        var uName = req.body.uName;
        var bio = req.body.bio;
        var pw = req.body.pw;

        // console.log(dPicture);

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
            else 
                res.redirect('/error');
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
    },

    editAccount: function (req, res) {
        
        var dPicture;
        var uName = req.session.uName;

        if(req.files.length == 0) {
            dPicture = null;
        } else {
            dPicture = req.files[0].id;
        }
        
        
        var indivUser = {
            dPicture: dPicture,
            fName: req.body.fName,
            lName: req.body.lName,
            email: req.body.email,
            bio: req.body.bio,
            pw: req.body.pw,
        }

        db.updateOne(userCollection, {uName: uName},indivUser,function(update){
            console.log(update);
            if(update != null){
                res.redirect('/settings');
            }
        })



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