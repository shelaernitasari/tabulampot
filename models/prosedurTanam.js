const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    idLangkah: String,
    idTanaman: String,
    idProsedur: String,
    urutanLangkah: Number
});

module.exports = mongoose.model('prosedurTanam', productSchema);