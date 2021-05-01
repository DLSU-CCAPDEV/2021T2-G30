const db = require('../models/db.js');
const entryCollection = require('../models/EntryModel.js');

const memoriesController = {
    getMemories: function(req, res) {
        //get the current date
        //get the year-1 
        //get entries equal to current year-1

        // var formattedDate = today.getFullYear().toString() + '-' + (today.getMonth() + 1).toString().padStart(2, 0) + '-' + today.getDate().toString().padStart(2, 0);
        if(req.session.uName) {
            var date = new Date();
            date.setFullYear(date.getFullYear() - 1); //last year's memories
            var newdate = new Date(date.toDateString());
            
            var query = {
                authorUserName: req.session.uName,
                entryDate: {$eq: newdate}
            }

            //find all entries from last year
            db.findMany(entryCollection, query, '', function(result) {
                res.render('memories', {
                    title: 'SafeSpace',
                    css: ['global','mainpage'],
                    entries: result,
                    sessionUser: req.session.uName
                });
            
            }); 
        } else {
            res.status(401);
            res.render('error', {
                title: '401 Unauthorized Access',
                css:['global', 'error'],
                status: {
                    code: "401",
                    message: "Unautorized access."
                } 
                
            });
        }
    }
}

module.exports = memoriesController;