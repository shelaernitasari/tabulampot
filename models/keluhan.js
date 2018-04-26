const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    keluhan: String,
    idMacam: String
});

module.exports = mongoose.model('keluhan', productSchema);