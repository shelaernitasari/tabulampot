const mongoose = require('mongoose');

const tipeProsedurSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    prosedur: String
});

module.exports = mongoose.model('tipeProsedur', tipeProsedurSchema);