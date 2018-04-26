const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    jenisHama: String
});

module.exports = mongoose.model('jenisHama', productSchema);