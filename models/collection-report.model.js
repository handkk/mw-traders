const mongoose = require('mongoose');

var collection_report = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    farmer_id: {
        type: String,
        default: ''
    },
    amount: {
        type: Number,
        default: 0,
        required: true
    },
    spent_reasons: {
        type: Array,
        default: []
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
    },
    created_by: {
        type: String,
        required: true
    },
    created_name: {
        type: String,
        required: true,
        default: ''
    },
    report_approved: {
        type: Boolean,
        default: false
    }
});

const collection_report_schema = mongoose.model('collection_report', collection_report);

module.exports = collection_report_schema;