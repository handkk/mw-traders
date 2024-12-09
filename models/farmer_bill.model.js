const mongoose = require('mongoose');

var farmerbill = new mongoose.Schema({
    farmer_name: {
        type: String,
        required: true
    },
    farmer_id: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    },
    vegetables: {
        type: Array,
        required: true,
        default: []
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

const farmerbillschema = mongoose.model('farmerbills', farmerbill);

module.exports = farmerbillschema;