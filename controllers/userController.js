const db = require('../models/db.js');
const userCollection = require('../models/UserModel.js');

const userController = {

    getUserProfile: function(req, res) {
        var query = {uName: req.params.uName};
        var projection = 'dPicture fName lName uName bio';

        console.log("im here");

        db.findOne(userCollection, query, projection, function(user) {
            
            if(user != null) {
                var query = {friendsList: {friendName: user.uName}};
                db.findOne(userCollection, query, projection, function(result) {
                    var friend
                    if(result === null) 
                        friend = false
                    else 
                        friend = true
                    
                    res.render('user',  {
                        title: 'SafeSpace',
                        css: ['global','personalprofile'], 
                        details: user,
                        friend: friend,
                        sessionUser: req.session.uName
                    });
                })
                
            } else {
                //console.log('error');
                res.status(404);
                res.redirect('/error');
            }
        });
    }
    
};   

module.exports = userController;