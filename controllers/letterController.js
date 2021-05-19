const db = require('../models/db.js');
const letterCollection = require('../models/LetterModel.js');
const userCollection = require('../models/UserModel.js');
const mongoose = require('mongoose');

const letterController = {

    getLetters: function(req, res) {
        db.findOnePopulate(userCollection, {uName: req.session.uName}, '', {path: 'letters', model: 'Letter'}, function(populateResult) {
            console.log('hello');
            res.render('letters', {
                title: 'Safe Space',
                css: ['global','mainpage'],
                letters: populateResult.letters,
                friends: populateResult.friendsList,
                sessionUser: req.session.uName
            });
        })
    },

    createLetter: function(req, res) {
        
        var letterTitle = req.body.letterTitle;
        var letterBody = req.body.letterBody;
        var author = req.session.uName;
        var dateToRecieve = new Date(req.body.dateToRecieve);
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

        var letter = {
            _id: mongoose.Types.ObjectId(),
            letterTitle: letterTitle,
            letterBody: letterBody,
            author: author,
            recipient: recipient,
            dateToRecieve: dateToRecieve.setHours(0, 0, 0),
            entryImage: entryImage
        }

        var update = {
            $push: {
                letters: {letter: letter._id}
            }
        }

        db.insertOne(letterCollection, letter, function(flag) {
            db.updateOne(userCollection, {uName: author}, update, function(flag) {
                db.updateOne(userCollection, {uName: recipient}, update, function(flag) {
                    res.send(true);
                })
            })
        })
    }
};   

module.exports = letterController;