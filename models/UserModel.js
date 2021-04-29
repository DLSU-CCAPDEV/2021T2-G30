// import module `mongoose`
var mongoose = require('mongoose');

// defines the schema for collection `users`
var UserSchema = new mongoose.Schema({
    dPicture: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'uploads', 
        required: false
    },
    fName: {
        type: String,
        required: true
    },
    lName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    uName: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: false
    },
    pw: {
        type: String,
        required: true
    },
    entries: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'entries',
        required: false
    }]
});

/*
    exports a mongoose.model object based on `UserSchema` (defined above)
    when another script exports from this file
    This model executes CRUD operations
    to collection `users` -> plural of the argument `User`
*/
module.exports = mongoose.model('User', UserSchema);
