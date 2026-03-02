const mongoose = require('mongoose');

const ContratBoxSchema = new mongoose.Schema({
    boxId: {type: mongoose.Schema.Types.ObjectId, ref: 'Box', required: true},
    boutiqueId : {type: mongoose.Schema.Types.ObjectId, ref: 'Boutique', required: true},
    dateDebut: {type: Date, required: true},
    dateFin: {type: Date, required: true},
    loyer : Number,
    datePayement : {type: Date, default: null},
    status: {type: mongoose.Schema.Types.ObjectId, ref: 'StatusContrat', required: true}
});


module.exports = mongoose.model('ContratBox', ContratBoxSchema);