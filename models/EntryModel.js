// import module `mongoose`
var mongoose = require('mongoose');

// defines the schema for collection `users`
var EntrySchema = new mongoose.Schema({
    title: {
         type: String,
         required: true
    },
    body: {
        type: String,
        required: true
    },
    significance: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    authorUserName: {
        type: String,
        required: true
    },
    privacy: {
        type: String,
        required: true
    }
});

/*
    exports a mongoose.model object based on `UserSchema` (defined above)
    when another script exports from this file
    This model executes CRUD operations
    to collection `users` -> plural of the argument `User`
*/
module.exports = mongoose.model('Entry', EntrySchema);
