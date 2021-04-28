// import module `mongoose`
var mongoose = require('mongoose');

// defines the schema for collection `users`
var EntrySchema = new mongoose.Schema({
    title: {
         type: String,
         required: false
    },
    body: {
        type: String,
        required: false
    },
    significance: {
        type: Number,
        required: false
    },
    date: {
        type: Date,
        required: false
    },
    authorUserName: {
        type: String,
        required: false
    },
    privacy: {
        type: String,
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
