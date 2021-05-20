// import module `mongoose`
var mongoose = require('mongoose');

// defines the schema for collection `users`
var LetterSchema = new mongoose.Schema({
    letterTitle: {
        type: String,
        required: true
    },
    letterBody: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    recipient: {
        type: String,
        required: true
    },
    dateToReceive: {
        type: Date,
        required: true
    },
    entryImage: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'uploads'
    }
});

module.exports = mongoose.model('Letter', LetterSchema);
