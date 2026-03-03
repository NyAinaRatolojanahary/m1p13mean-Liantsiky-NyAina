const AchatJeton = require('../models/AchatJeton');
const Jeton = require('../models/Jeton');
const StatusTraitement = require('../models/StatusTraitement');

exports.acheterJeton = async (userId, data) => {
    // 10: En cours (Pending)
    const statusPending = await StatusTraitement.findOne({ code: 10 });
    if (!statusPending) throw new Error("Status 'En cours' introuvable");

    let montantTotal = 0;
    const jetonsItems = [];

    for (const item of data.items) {
        const jeton = await Jeton.findById(item.jetonId);
        if (!jeton) throw new Error("Jeton introuvable");

        const total = jeton.montant * item.nombre;
        montantTotal += total;

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
        status: statusPending._id,
        jetons: jetonsItems,
        montantTotal: montantTotal
    });

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
