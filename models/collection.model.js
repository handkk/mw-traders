const mongoose = require('mongoose');
// const schema = mongoose.Schema;

var collection = new mongoose.Schema({
    collection_date: {
        type: Date,
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
    created_at: {
        type: Date
    },
    modified_at: {
        type: Date
    }
});

const collectionschema = mongoose.model('collections', collection);

module.exports = collectionschema;