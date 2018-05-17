const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    idKeluhan: String,
    idTanaman: String,
    idMacam: String,
    urutanKeluhan: Number

});

module.exports = mongoose.model('prosedurKeluhan', productSchema);