const mongoose = require('mongoose');
const Etage = require('../models/Etage');

exports.createEtage = async (data) => {
    const existingEtage = await Etage.findOne({ nom: data.nom });   
    if (existingEtage) throw new Error('Etage déja existant');
    const etage = await Etage.create({
        nom: data.nom,
        nombreBox: data.nombreBox
    });
    return etage;
}