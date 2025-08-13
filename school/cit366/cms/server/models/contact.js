var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    id: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    imageUrl: { type: String },
    name: { type: String, required: true },
    group: [{ type: Schema.Types.ObjectId, ref: 'Contact' }]
});

module.exports = mongoose.model('Contact', schema);