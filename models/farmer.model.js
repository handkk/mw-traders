const mongoose = require('mongoose');
// const schema = mongoose.Schema;

var farmer = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
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
        default: Date.new
    },
    modified_at: {
        type: Date,
        default: Date.new
    }
});

const farmerschema = mongoose.model('farmers', farmer);

module.exports = farmerschema;