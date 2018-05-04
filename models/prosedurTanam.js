const mongoose = require('mongoose');

const prosedurTanamSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    langkah : {type: mongoose.Schema.Types.ObjectId, ref : 'Langkah', required: true},
    tanaman : {type: mongoose.Schema.Types.ObjectId, ref : 'Tanaman', required: true},
    urutanLangkah:  { type: Number}
});

module.exports = mongoose.model('prosedurTanam', prosedurTanamSchema);