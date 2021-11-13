const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    emailVerifiedAt: {
        type: Date
    },
    username: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
},  {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);