// import module `mongoose`
var mongoose = require('mongoose');

// defines the schema for collection `users`
var EntrySchema = new mongoose.Schema({
    entryTitle: {
         type: String
    },
    entryBody: {
        type: String
    },
    significance: {
        type: String
    },
    entryDate: {
        type: Date
    },
    timePosted: {
        type: Number
    },
    authorUserName: {
        type: String
    },
    privacy: {
        type: String
    },
    entryImage: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'uploads', 
        required: false
    }
});

/*
    exports a mongoose.model object based on `UserSchema` (defined above)
    when another script exports from this file
    This model executes CRUD operations
    to collection `users` -> plural of the argument `User`
*/
module.exports = mongoose.model('Entry', EntrySchema);
