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
    last_amount_updated: {
        type: Number,
        default: 0
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
        type: Date
    },
    modified_at: {
        type: Date
    },
    customerCollection: {
        type: Array,
        default: []
    },
    created_by: {
        type: String,
        required: true
    }
});

const customerschema = mongoose.model('customers', customer);

module.exports = customerschema;