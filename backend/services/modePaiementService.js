const mongoose = require('mongoose');

const ModePaiement = require('../models/ModePaiement');

exports.getAllModesPaiement = async () => {
    return await ModePaiement.find()
};

exports.createModePaiement = async (data) => {
    const existingMode = await ModePaiement.findOne({ nom: data.nom });
    if (existingMode) throw new Error(' Mode de paiement deja existant');
    const modePaiement = await ModePaiement.create({
        nom: data.nom
    });
    return modePaiement;
}