const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    prosedur: String
});

module.exports = mongoose.model('prosedur', productSchema);