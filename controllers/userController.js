const db = require('../models/db.js');
const userCollection = require('../models/UserModel.js');
const entryCollecion = require('../models/EntryModel.js');

const userController = {

    getUserProfile: function(req, res) {
        var query = {uName: req.params.uName};
        var projection = 'dPicture fName lName uName bio';

        //console.log("successful");

        db.findOne(userCollection, query, projection, function(user) {
            //console.log(user.uName + ' <--- user to add')
            if(user != null) {
                var friend = -1;
                var queryFriend = {uName: req.session.uName, "friendsList.friendName": user.uName};
                var querySent = {uName: req.session.uName, "sentRequest.username": user.uName};
                var queryPending = {uName: req.session.uName, "pendingRequest.username": user.uName};

                /*
                2 = friends
                1 = sent
                0 = to accept 
                -1 = not friends
                */

                //console.log(req.session.uName + ' <--- session user');

                db.findOne(userCollection, queryFriend, projection, function(result1) {
                    
                    if(result1 != null) 
                        friend = 2;
                    
                    db.findOne(userCollection, querySent, projection, function(result2) {
                        //console.log(result.uName);
                        if(result2 != null) 
                            friend = 1;

                        db.findOne(userCollection, queryPending, projection, function(result3) {
                            //console.log(result.uName);
                            if(result3 != null) 
                                friend = 0;

                            if(friend === 2) {
                                console.log('friends');
                                db.findMany(entryCollecion, {authorUserName: req.params.uName, privacy: 'public'}, '', function(friendEntries) {
                                    console.log(friendEntries);
                                    res.render('user',  {
                                        title: 'SafeSpace',
                                        css: ['global', 'mainpage', 'friendprofile'], 
                                        details: user,
                                        entries: friendEntries,
                                        friendStatus: friend,
                                        friend: true,
                                        sessionUser: req.session.uName
                                    });
                                })
                            }
                            else {
                                res.render('user',  {
                                    title: 'SafeSpace',
                                    css: ['global', 'mainpage', 'friendprofile'], 
                                    details: user,
                                    friendStatus: friend,
                                    friend: false,
                                    sessionUser: req.session.uName
                                });
                            }
                            
                            
                        });
                    });
                });
                
            } else {
                //console.log('error');
                res.status(404);
                res.redirect('/error');
            }
        });
    },

    friendRequest: function(req, res) {

        var receiver = req.query.receiver;
        var sender = req.session.uName;

        db.findOne(userCollection, {uName: receiver}, '', function(resultReceiver) {
            db.findOne(userCollection, {uName: sender}, '', function(resultSender) {
                var updateSender = {
                    $push: {
                      sentRequest: {userId: resultReceiver._id, username: resultReceiver.uName}
                    }
                }
                var updateReceiver = {
                    $push: {
                      pendingRequest: {userId: resultSender._id, username: resultSender.uName}
                    }
                }
                //console.log(updateReceiver + ' IN ' + resultSender.uName);
                db.updateOne(userCollection, {uName: resultReceiver.uName}, updateReceiver, function(flag) {
                    if(flag)
                        console.log('Successfully updated ' + resultReceiver.uName);
                    db.updateOne(userCollection, {uName: resultSender.uName}, updateSender, function(flag) {
                        if(flag) {
                            console.log('Successfully updated ' + resultSender.uName);
                            res.send(true);
                        }
                        //res.redirect('/mainpage');
                    });
                });
            });
        });
    },

    pendingRequest: function(req, res) {

        var receiver = req.query.receiver;
        var sender = req.session.uName;

        db.findOne(userCollection, {uName: receiver}, '', function(resultReceiver) {
            db.findOne(userCollection, {uName: sender}, '', function(resultSender) {
                var updateSender = {
                    $pull: {
                      sentRequest: {userId: resultReceiver._id, username: resultReceiver.uName}
                    }
                }
                var updateReceiver = {
                    $pull: {
                      pendingRequest: {userId: resultSender._id, username: resultSender.uName}
                    }
                }
                //console.log(updateReceiver + ' IN ' + resultSender.uName);
                db.updateOne(userCollection, {uName: resultReceiver.uName}, updateReceiver, function(flag) {
                    if(flag)
                        console.log('Successfully updated ' + resultReceiver.uName);
                    db.updateOne(userCollection, {uName: resultSender.uName}, updateSender, function(flag) {
                        if(flag)
                            console.log('Successfully updated ' + resultSender.uName);
                        //res.redirect('/userprofile/' + resultReceiver.uName);
                        res.send(true);
                    });
                });
            });
        });
    },

    acceptRequest: function(req, res) {

        var receiver = req.query.receiver;
        var sender = req.session.uName;
        var ifaccept = req.query.accept;
        
        db.findOne(userCollection, {uName: receiver}, '', function(resultReceiver) {
            db.findOne(userCollection, {uName: sender}, '', function(resultSender) {
                var updateReceiverRemove = {
                    $pull: {
                      sentRequest: {userId: resultSender._id, username: resultSender.uName}
                    }
                }
                var updateSenderRemove = {
                    $pull: {
                      pendingRequest: {userId: resultReceiver._id, username: resultReceiver.uName}
                    }
                }
                var updateSender = {
                    $push: {
                      friendsList: {friendId: resultReceiver._id, friendName: resultReceiver.uName}
                    }
                }
                var updateReceiver = {
                    $push: {
                      friendsList: {friendId: resultSender._id, friendName: resultSender.uName}
                    }
                }
                db.updateOne(userCollection, {uName: resultReceiver.uName}, updateReceiverRemove, function(flag) {
                    db.updateOne(userCollection, {uName: resultSender.uName}, updateSenderRemove, function(flag) {
                        if(ifaccept === 'true') {
                            db.updateOne(userCollection, {uName: resultReceiver.uName}, updateReceiver, function(flag) {
                                db.updateOne(userCollection, {uName: resultSender.uName}, updateSender, function(flag) {
                                    //res.send(true);
                                });
                            });
                        }
                        res.send(true);
                    });
                });
            });
        });
    },

    unfriend: function(req, res) {

        var receiver = req.query.receiver;
        var sender = req.session.uName;

        db.findOne(userCollection, {uName: receiver}, '', function(resultReceiver) {
            db.findOne(userCollection, {uName: sender}, '', function(resultSender) {
                var updateReceiver = {
                    $pull: {
                      friendsList: {friendId: resultSender._id, friendName: resultSender.uName}
                    }
                }
                var updateSender = {
                    $pull: {
                        friendsList: {friendId: resultReceiver._id, friendName: resultReceiver.uName}
                    }
                }
                db.updateOne(userCollection, {uName: resultReceiver.uName}, updateReceiver, function(flag) {
                    db.updateOne(userCollection, {uName: resultSender.uName}, updateSender, function(flag) {
                        res.send(true);
                    });
                });
            });
        });
    }
    
};   

module.exports = userController;