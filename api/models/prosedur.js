const mongoose = require('mongoose');

const prosedurSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    prosedur : {type: String}
    
});

module.exports = mongoose.model('Prosedur', prosedurSchema);