const mongoose = require('mongoose');
const schema = mongoose.Schema;

var transaction = new mongoose.Schema({
    transaction_date: {
        type: Date,
        required: true
    },
    customer_info: {
        type: schema.Types.Mixed,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        default: ''
    },
    performed_by: {
        type: schema.Types.Mixed,
        required: true
    },
    created_at: {
        type: Date
    },
    modified_at: {
        type: Date
    }
});

const transactionschema = mongoose.model('transactions', transaction);

module.exports = transactionschema;