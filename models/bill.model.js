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
        type: String,
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
    },
    created_by: {
        type: String,
        required: true
    },
    balance_amount: {
        type: Number,
        required: true,
        default: 0
    }
});

const billschema = mongoose.model('bills', bill);

module.exports = billschema;