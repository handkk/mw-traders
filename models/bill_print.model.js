const mongoose = require('mongoose');

var bill_print = new mongoose.Schema({
    bill_date: {
        type: Date,
        required: true
    },
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
    bills: {
        type: Array,
        default: []
    },
    created_at: {
        type: Date
    },
    modified_at: {
        type: Date
    }
});

const bill_print_schema = mongoose.model('bill_prints', bill_print);

module.exports = bill_print_schema;