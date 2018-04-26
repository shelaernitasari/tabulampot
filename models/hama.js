const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    hama: String,
    idJenis: String
});

module.exports = mongoose.model('hama', productSchema);