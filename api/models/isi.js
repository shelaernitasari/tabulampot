const mongoose = require('mongoose');

const isiSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    judul : {type: String},
    content : {type: String},
    tanggal : {type: Date},
    idmenu : {type: mongoose.Schema.Types.ObjectId, ref : 'Menu', required: true}
    
}, {
    timestamps: true
});

module.exports = mongoose.model('Isi', isiSchema);