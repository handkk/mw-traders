const mongoose = require('mongoose');
// const schema = mongoose.Schema;

var customer = new mongoose.Schema({
    name: {
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
    balance_amount: {
        type: Number,
        default: 0
    },
    collected_amount: {
        type: Number,
        default: 0
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

const customerschema = mongoose.model('customers', customer);

module.exports = customerschema;