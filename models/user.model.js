const mongoose = require('mongoose');
const schema = mongoose.Schema;

var user = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique : true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        default: ''
    },
    userId: {
        type: String,
        required: true
    },
    sessionId: {
        type: String,
        default: null
    },
    phone_number: {
        type: Number,
        default: null
    },
    address: {
        type: String,
        default: ''
    },
    notes: {
        type: String,
        default: ''
    },
    created_at: {
        type: Date,
        default: new Date()
    },
    modified_at: {
        type: Date,
        default: new Date()
    }
});

const userschema = mongoose.model('users', user);

module.exports = userschema;