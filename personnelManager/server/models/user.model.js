const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "first name is required."],
        minlength: [2, "first name must be at least 2 characters long."]
    },
    lastName: {
        type: String,
        required: [true, "last name is required."],
        minlength: [2, "last name must be at least 2 characters long."]
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, "email address is required."],
        unique: [true, "email already exits, please login."]
    },
    password: {
        type: String,
        required: [true, "password is required."],
        bcrypt: true,
        minlength: [8, "password must be 8-16 characters long."],
        maxlength: [16, "password must be 8-16 characters long."]
    },
    currentUnit: {
        type: [String]
    },
    rate: {
        type: String
    },
    rank: {
        type: String
    },
    rotationDate: {
        type: Date,
        default: null
    },
    endOfService: {
        type: Date,
        default: null
    },
    quals: {
        type: [String]
    },
    bio:{
        type: String
    },
    admin: {
        type: Boolean,
        default: false
    },
    activated: {
        type: Boolean,
        default: true
    }
}, {timestamps: true}); 

UserSchema.plugin(require('mongoose-bcrypt'));

module.exports = mongoose.model('User', UserSchema);