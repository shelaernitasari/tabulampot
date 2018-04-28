const mongoose = require('mongoose');

const tanamanSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    namatanaman:  { type: String}
});

module.exports = mongoose.model('Tanaman', tanamanSchema);