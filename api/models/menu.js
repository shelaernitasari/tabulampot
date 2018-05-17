const mongoose = require('mongoose');

const menuSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    root : {type: mongoose.Schema.Types.ObjectId, ref : 'Menu', required: false},
    menu : {type: String}
    
});

module.exports = mongoose.model('Menu', menuSchema);