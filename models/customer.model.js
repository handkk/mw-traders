const mongoose = require('mongoose');
// const schema = mongoose.Schema;

var customer = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
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
        default: Date.new
    },
    modified_at: {
        type: Date,
        default: Date.new
    }
});

const customerschema = mongoose.model('customers', customer);

module.exports = customerschema;