const AchatJeton = require('../models/AchatJeton');
const Jeton = require('../models/Jeton');
const StatusTraitement = require('../models/StatusTraitement');
const portefeuilleService = require('./portefeuilleService');

exports.acheterJeton = async (userId, data) => {
    // 20: Termine (Done) - As requested by user to credit immediately
    const statusTermine = await StatusTraitement.findOne({ code: 20 });
    if (!statusTermine) throw new Error("Status 'Termine' introuvable");

    let montantTotal = 0;
    let totalJetons = 0;
    const jetonsItems = [];

    for (const item of data.items) {
        const jeton = await Jeton.findById(item.jetonId);
        if (!jeton) throw new Error("Jeton introuvable");

        const total = jeton.montant * item.nombre;
        montantTotal += total;
        totalJetons += total; // Assuming jeton.montant is the number of tokens

        jetonsItems.push({
            jetonId: jeton._id,
            prixUnitaire: jeton.montant,
            nombre: item.nombre,
            total: total
        });
    }

    const achatJeton = await AchatJeton.create({
        clientId: userId,
        modePaiementId: data.modePaiementId,
        referenceVirement: data.referenceVirement,
        note: data.note,
        status: statusTermine._id,
        dateTraiter: new Date(),
        jetons: jetonsItems,
        montantTotal: montantTotal
    });

    // Credit the wallet
    await portefeuilleService.crediter(userId, totalJetons);

    return achatJeton;
};

exports.getUserHistory = async (userId) => {
    return await AchatJeton.find({ clientId: userId })
        .populate('status')
        .populate('modePaiementId')
        .populate('jetons.jetonId')
        .sort({ dateDemande: -1 });
};

exports.getAll = async () => {
    return await AchatJeton.find()
        .populate('clientId')
        .populate('status')
        .populate('modePaiementId')
        .sort({ dateDemande: -1 });
};
