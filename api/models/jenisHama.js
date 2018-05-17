const mongoose = require('mongoose');

const jenisHamaSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    jenisHama: { type: String}
});

module.exports = mongoose.model('jenisHama', jenisHamaSchema);