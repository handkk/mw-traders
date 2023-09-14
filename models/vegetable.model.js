const mongoose = require('mongoose');
// const schema = mongoose.Schema;

var vegetable = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    number: {
        type: Number,
        required: true,
        unique: true
    },
    notes: {
        type: String,
        default: ''
    },
    created_at: {
        type: Date
    },
    modified_at: {
        type: Date
    }
});

const vegetableschema = mongoose.model('vegetables', vegetable);

module.exports = vegetableschema;