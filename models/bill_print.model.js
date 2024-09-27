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
    items: {
        type: Array,
        default: []
    },
    customer_id: {
        type: String,
        default: '',
        required: true
    },
    created_at: {
        type: Date
    },
    modified_at: {
        type: Date
    },
    created_by: {
        type: String,
        required: true
    },
    bill_amount: {
        type: Number,
        default: 0
    },
    balance_amount: {
        type: Number,
        default: 0
    }
});

const bill_print_schema = mongoose.model('bill_prints', bill_print);

module.exports = bill_print_schema;