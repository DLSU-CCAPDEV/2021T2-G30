const db = require('../models/db.js');
const letterCollection = require('../models/LetterModel.js');
const userCollection = require('../models/UserModel.js');
const mongoose = require('mongoose');
const { date } = require('../helpers/helpers.js');
const {validationResult} = require('express-validator');
//var formattedDate = today.getFullYear().toString() + '-' + (today.getMonth() + 1).toString().padStart(2, 0) + '-' + today.getDate().toString().padStart(2, 0);

const letterController = {

    getLetters: function(req, res) {

        if(req.session.uName) {
            var today = new Date();

            if(req.session.letterType === 'incoming') {
                var path = {
                    path: 'letters',
                    match: {'dateToReceive': { $lte: today}, 'recipient': req.session.uName},
                    model: 'Letter'
                }
                var direction = true;
            }
            else {
                var path = {
                    path: 'letters',
                    match: {'author': req.session.uName},
                    model: 'Letter'
                }
                var direction = false;
            }
            db.findOnePopulate(userCollection, {uName: req.session.uName}, '', path, function(populateResult) {
                var letters = [];
                populateResult.letters.forEach(function(indivLetter) {
                    if(indivLetter !== null) {
                        if(!direction) {
                            if(indivLetter.recipient !== req.session.uName) {
                                letters.push(indivLetter);
                            }
                        } 
                        else {
                            letters.push(indivLetter);
                        }
                    }
                });

                letters.sort(function (letterOne, letterTwo) {
                    return letterTwo.dateToReceive - letterOne.dateToReceive;
                })

                res.render('letters', {
                    title: 'Safe Space',
                    css: ['global','mainpage'],
                    incoming: direction,
                    letters: letters,
                    friends: populateResult.friendsList,
                    sessionUser: req.session.uName
                });
            })
        }
        else {
            // res.status(401);
            // res.render('error', {
            //     title: '401 Unauthorized Access',
            //     css:['global', 'error'],
            //     status: {
            //         code: "401",
            //         message: "Unauthorized access"
            //     },
            //     sessionUser: req.session.uName 
            // });
            res.redirect('/login');
        }

        
    },

    getLettersOutgoing: function(req, res) {
        if(req.session.letterType === 'incoming')
            req.session.letterType = 'outgoing'
        else
            req.session.letterType = 'incoming'

        res.send(true);
    },

    createLetter: function(req, res) {
        
        var errors = validationResult(req);
        var formattedDate = req.body.currDate;
        var currDate = new Date(formattedDate);
        
        var letterTitle = req.body.letterTitle;
        var letterBody = req.body.letterBody;
        var author = req.session.uName;
        var dateToReceive = new Date(req.body.dateToReceive);
        var recipient;
        var entryImage;

        if(req.body.recipient === 'Yourself')
            recipient = req.session.uName;
        else
            recipient = req.body.recipient;

        if(req.files.length > 0) {
            entryImage = req.files[0].id;
        } else {
            entryImage = null;
        }
        
        if(!errors.isEmpty() || (dateToReceive < currDate)) {
            console.log("Invalid letter created. Try again.");
        } else {
            var letter = {
                _id: mongoose.Types.ObjectId(),
                letterTitle: letterTitle,
                letterBody: letterBody,
                author: author,
                recipient: recipient,
                dateToReceive: dateToReceive,
                entryImage: entryImage
            }
    
            var update = {
                $push: {
                    letters: letter._id
                }
            }
    
            db.insertOne(letterCollection, letter, function(flag) {
                db.updateOne(userCollection, {uName: author}, update, function(flag) {
                    if(author === recipient)
                        res.send(true);
                    else { 
                        db.updateOne(userCollection, {uName: recipient}, update, function(flag) {
                            res.send(true);
                        })
                    }
                })
            })
        }
    },
};   

module.exports = letterController;