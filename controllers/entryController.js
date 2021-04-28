const db = require('../models/db.js');
const entryCollection = require('../models/EntryModel.js');

const routerController = {

    createEntry: function(req, res) {
        console.log('hello');
    },

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
    }
};   

module.exports = routerController;