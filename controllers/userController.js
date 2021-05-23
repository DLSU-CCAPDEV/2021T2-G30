const db = require('../models/db.js');
const userCollection = require('../models/UserModel.js');
const entryCollecion = require('../models/EntryModel.js');

const userController = {

    getUserProfile: function(req, res) {

        if(req.session.uName) {
            if(req.params.uName === req.session.uName)
                res.redirect('/profile/' + req.session.uName);
            
            else {
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
                                        // console.log('friends');
                                        db.findMany(entryCollecion, {authorUserName: req.params.uName, privacy: 'public'}, '', {entryDate: -1}, function(friendEntries) {
                                            // console.log(friendEntries);
                                            res.render('user',  {
                                                title: 'Safe Space',
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
                                            title: 'Safe Space',
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
                        res.redirect('/usererror');
                    }
                });
            }

        } else {
            res.redirect('/login');
        }
    },

    friendRequest: function(req, res) {

        var receiver = req.query.receiver;
        var sender = req.session.uName;

        db.findOne(userCollection, {uName: receiver}, '', function(resultReceiver) {
            if(resultReceiver !== null) {
                db.findOne(userCollection, {uName: sender}, '', function(resultSender) {
                    // console.log("resultReceiver: " + resultReceiver);
                    // console.log("resultSender: " + resultSender)
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
            }
            else {
                res.status(400);
                res.render('error', {
                    title: '400 Bad Request',
                    css:['global', 'error'],
                    status: {
                        code: "400",
                        message: "Bad request"
                    },
                    sessionUser: req.session.uName    
                });
            }
        });
    },

    pendingRequest: function(req, res) {

        var receiver = req.query.receiver;
        var sender = req.session.uName;

        db.findOne(userCollection, {uName: receiver}, '', function(resultReceiver) {
            if(resultReceiver !== null) {
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
            }
            else {
                res.status(400);
                res.render('error', {
                    title: '400 Bad Request',
                    css:['global', 'error'],
                    status: {
                        code: "400",
                        message: "Bad request"
                    },
                    sessionUser: req.session.uName    
                });
            }
        });
    },

    acceptRequest: function(req, res) {

        var receiver = req.query.receiver;
        var sender = req.session.uName;
        var ifaccept = req.query.accept;
        
        db.findOne(userCollection, {uName: receiver}, '', function(resultReceiver) {
            if(resultReceiver !== null) {
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
            }
            else {
                res.status(400);
                res.render('error', {
                    title: '400 Bad Request',
                    css:['global', 'error'],
                    status: {
                        code: "400",
                        message: "Bad request"
                    },
                    sessionUser: req.session.uName    
                });
            }
        });
    },

    unfriend: function(req, res) {

        var receiver = req.query.receiver;
        var sender = req.session.uName;

        db.findOne(userCollection, {uName: receiver}, '', function(resultReceiver) {
            if(resultReceiver !== null) {
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
            }
            else {
                res.status(400);
                res.render('error', {
                    title: '400 Bad Request',
                    css:['global', 'error'],
                    status: {
                        code: "400",
                        message: "Bad request"
                    },
                    sessionUser: req.session.uName    
                });
            }
        });
    }
};   

module.exports = userController;