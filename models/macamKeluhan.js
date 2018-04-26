const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    macamKeluhan: String
});

module.exports = mongoose.model('macamKeluhan', productSchema);