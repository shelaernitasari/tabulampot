const mongoose = require('mongoose');

const buahSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    buah : {type: String},
    idProsedur : {type: mongoose.Schema.Types.ObjectId, ref : 'Prosedur', required: true},
    idSubProsedur:  {type: mongoose.Schema.Types.ObjectId, ref : 'SubProsedur', required: true}
});

module.exports = mongoose.model('Buah', buahSchema);