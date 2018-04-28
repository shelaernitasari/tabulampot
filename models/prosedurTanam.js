const mongoose = require('mongoose');

const prosedurTanamSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    tanaman : {type: mongoose.Schema.Types.ObjectId, ref : 'Tanaman', required: true},
    urutanLangkah:  { type: Number}
});

module.exports = mongoose.model('prosedurTanam', prosedurTanamSchema);