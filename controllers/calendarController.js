const db = require('../models/db.js');
const entryCollection = require('../models/EntryModel.js');

const calendarController = {
    getCalendar: function(req, res) {
        if(req.session.uName) {
            res.render('calendar', {
                title: 'Calendar View',
                calendar:true,
                css: ['global']
            });
        } else {
            res.status(401);
            res.render('error', {
                title: '401 Unauthorized Access',
                css:['global', 'error'],
                status: {
                    code: "401",
                    message: "Unauthorized access."
                } 
                
            });
        }
    }
}

module.exports = calendarController;