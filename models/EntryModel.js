// import module `mongoose`
var mongoose = require('mongoose');

// defines the schema for collection `users`
var EntrySchema = new mongoose.Schema({
    entryTitle: {
         type: String,
         required: false
    },
    entryBody: {
        type: String,
        required: false
    },
    significance: {
        type: String,
        required: false
    },
    entryDate: {
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
    },
    entryImage: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'uploads', 
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
