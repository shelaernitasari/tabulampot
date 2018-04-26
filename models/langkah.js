const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    langkah: String,
    idProsedur: String
});

module.exports = mongoose.model('langkah', productSchema);