const mongoose = require('mongoose');

const subProsedurSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    proses : {type: String}
    
});

module.exports = mongoose.model('subProsedur', subProsedurSchema);