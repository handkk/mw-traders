const mongoose = require('mongoose');
// const schema = mongoose.Schema;

var collection = new mongoose.Schema({
    collection_date: {
        type: String,
        required: true
    },
    customer_name: {
        type: String,
        required: true
    },
    customer_id: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    notes: {
        type: String,
        default: ''
    },
    collected_name: {
        type: String,
        required: true,
        default: 'admin'
    },
    collected_user_name: {
        type: String,
        required: true,
        default: 'admin'
    },
    collected_user_id: {
        type: String,
        required: true,
        default: '6497d8551ca77b54add93167'
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
    customer_balance: {
        type: Number,
        required: true,
        default: 0
    }
});

const collectionschema = mongoose.model('collections', collection);

module.exports = collectionschema;