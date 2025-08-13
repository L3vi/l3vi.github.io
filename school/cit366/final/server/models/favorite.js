var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    id: { type: String, required: true },
    color: { type: String },
    word: { type: String },
});

module.exports = mongoose.model('Favorite', schema);