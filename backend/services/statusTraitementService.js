const mongoose = require('mongoose');

const StatusTraitement = require('../models/StatusTraitement');

exports.getAllStatusPaiement = async () => {
    return await StatusTraitement.find()
};

exports.createStatusTraitement = async (data) => {
    const existingMode = await StatusTraitement.findOne({ nom: data.nom });
    if (existingMode) throw new Error(' Mode de paiement deja existant');
    const statusPaiement = await StatusTraitement.create({
        nom: data.nom
    });
    return statusPaiement;
}