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
    memoryenabler: {
        type: Boolean,
        required: false
    },
    entries: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'entries',
        required: false
    }],
    letters: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'letters',
        required: false
    }],
    sentRequest:[{
		userId: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
		username: {type: String, default: ''}
	}],
	pendingRequest: [{
		userId: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
		username: {type: String, default: ''}
	}],
	friendsList: [{
		friendId: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
		friendName: {type: String, default: ''}
	}]
});

module.exports = mongoose.model('User', UserSchema);
