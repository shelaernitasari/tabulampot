const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    idHama: String,
    idTanaman: String,
    idJenis: String,
    urutanHama: Number

});

module.exports = mongoose.model('prosedurHama', productSchema);