const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    tanaman: String
});

module.exports = mongoose.model('tanaman', productSchema);