var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('users', new Schema({
    name: {
        type: Schema.Types.String,
        required: true
    },
    email: {
        type: Schema.Types.String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.new
    },
    modified_at: {
        type: Date,
        default: Date.new
    }
}))