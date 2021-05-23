const db = require('../models/db.js');
const entryCollection = require('../models/EntryModel.js');
const userCollection = require('../models/UserModel.js');
const { editEntry } = require('./entryController.js');

const memoriesController = {
    getMemories: function(req, res) {

        if(req.session.uName) {
            db.findOne(userCollection, {uName: req.session.uName}, '', function(result) {
                //console.log(result.memoryenabler)
                if(result.memoryenabler) 
                    var memories = true;
                else 
                    var memories = false;
                
                var date = new Date();
                var newdate = new Date(date.toDateString());
                    
                db.findMany(entryCollection, {authorUserName: result.uName, entryDate: {$lt: newdate}}, '', {entryDate: 1}, function(result) {
                    var dates = [];

                    result.forEach(function(entry) {
                        var month = newdate.getMonth();
                        var day = newdate.getDate();

                        if(entry.entryDate.getMonth() === month && entry.entryDate.getDate() === day)
                            dates.push(entry);
                    });

                    res.render('memories', {
                        title: 'Safe Space | Memories',
                        css: ['global','mainpage'],
                        entries: dates,
                        sessionUser: req.session.uName,
                        memories: memories
                    });
                }); 
            });

        } else {
            // res.status(401);
            // res.render('error', {
            //     title: '401 Unauthorized Access',
            //     css:['global', 'error'],
            //     status: {
            //         code: "401",
            //         message: "Unauthorized access."
            //     },
            //     sessionUser: req.session.uName  
            // });
            res.redirect('/login');
        }
    }
}

module.exports = memoriesController;