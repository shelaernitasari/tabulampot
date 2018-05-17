const mongoose = require('mongoose');

const hamaSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    hama: { type: String},
    idJenis: {type: mongoose.Schema.Types.ObjectId, ref : 'jenisHama', required: true},
});

module.exports = mongoose.model('Hama', hamaSchema);