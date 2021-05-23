const db = require('../models/db.js');
const entryCollection = require('../models/EntryModel.js');

const calendarController = {
    getCalendar: function(req, res) {
        if(req.session.uName) {
            //get data from what user required
            res.render('calendar', {
                title: 'Calendar View',
                calendar:true,
                css: ['global', 'calendarview'],
                sessionUser: req.session.uName
            });
        } else {
            res.status(401);
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
    },
 
    //gets entries based on the date asked by user
    getDesiredEntries: function(req, res) {
        //need to get the date pressed by the user
        if(req.session.uName) {
            var dateInput = req.query.date;
            var newdate = new Date(dateInput);
            var query = {
                authorUserName: req.session.uName,
                entryDate: {$eq: newdate}
            }
            //get all the entries from that specific date
            db.findMany(entryCollection, query, '', {timePosted: -1}, function(result) {
                if(result.length !== 0) {
                    res.render('partials/calendarentrymodal', {entries: result, layout: false}, function(err, html) {
                        if(err)
                            res.send(false);
                        else {
                            //console.log(html);
                            res.send(html);
                        }
                            
                    });                
                } else { 
                    res.send("");
                }
            }); 

        } else {
            res.status(401);
            res.render('error', {
                title: '401 Unauthorized Access',
                css:['global', 'error'],
                status: {
                    code: "401",
                    message: "Unauthorized access."
                },
                sessionUser: req.session.uName
            });
        }
    }
}

module.exports = calendarController;