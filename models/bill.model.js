const mongoose = require('mongoose');
// const schema = mongoose.Schema;

var bill = new mongoose.Schema({
    customer_name: {
        type: String,
        required: true
    },
    customer_id: {
        type: String,
        required: true
    },
    customer_balance_amount: {
        type: Number,
        default: 0
    },
    quantity: {
        type: Number,
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    vegetable_name: {
        type: String,
        required: true
    },
    vegetable_id: {
        type: String,
        required: true
    },
    farmer_name: {
        type: String,
        required: true
    },
    farmer_id: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        default: ''
    },
    bill_date: {
        type: Date,
        required: true
    },
    unit_wise: {
        type: Boolean,
        required: true
    },
    total_amount: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date
    },
    modified_at: {
        type: Date
    }
});

const billschema = mongoose.model('bills', bill);

module.exports = billschema;