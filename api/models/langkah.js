const mongoose = require('mongoose');

const langkahSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    langkah: { type: String},
    tipeProsedur : {type: mongoose.Schema.Types.ObjectId, ref : 'tipeProsedur', required: true},
});

module.exports = mongoose.model('Langkah', langkahSchema);