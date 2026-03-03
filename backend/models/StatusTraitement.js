const mongoose = require('mongoose');

const StatusTraitementSchema = new mongoose.Schema ({
    nom : { type : String, required : true },
    code : { type : Number, required : true }
});

module.exports = mongoose.model('StatusTraitement', StatusTraitementSchema); // 10 : en cours , 20 : terminé