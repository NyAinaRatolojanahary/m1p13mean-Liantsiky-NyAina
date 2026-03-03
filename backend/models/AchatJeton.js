const mongoose = require('mongoose');

const AchatJetonSchema = new mongoose.Schema({
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur' },
    modePaiementId : { type: mongoose.Schema.Types.ObjectId, ref: 'ModePaiement' },
    referenceVirement : { type : String, required : true },
    dateDemande : { type : Date, default : Date.now() },
    dateTraiter : { type : Date, default : null },
    note : { type : String, default : ' '},
    status : { type: mongoose.Schema.Types.ObjectId, ref: 'StatusTraitement' },
    jetons : [
        {
            jetonId : { type: mongoose.Schema.Types.ObjectId, ref: 'Jeton' },
            prixUnitaire : Number,
            nombre : Number,
            total : Number
        }
    ],
    montantTotal : Number
})

module.exports = mongoose.model('AchatJeton', AchatJetonSchema);