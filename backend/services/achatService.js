const Achat = require('../models/Achat');
const AchatDetails = require('../models/AchatDetails');
const Produit = require('../models/Produit');
const portefeuilleService = require('./portefeuilleService');

exports.acheterPanier = async (userId, items) => {

  const session = await mongoose.startSession();
  session.startTransaction();

  try {

    let prixTotal = 0;
    const produits = [];

    for (const item of items) {
      const produit = await Produit.findById(item.produitId).session(session);

      if (!produit) throw new Error('Produit introuvable');
      if (produit.stock < item.quantite)
        throw new Error(`Stock insuffisant pour ${produit.nom}`);

      const totalProduit = produit.prixActuel * item.quantite;
      prixTotal += totalProduit;

      produits.push({
        produit,
        quantite: item.quantite,
        totalProduit
      });
    }

    await portefeuilleService.debiter(userId, prixTotal);

    const achat = await Achat.create([{
      clientId: userId,
      prixTotal
    }], { session });

    for (const p of produits) {

      await AchatDetails.create([{
        achatId: achat[0]._id,
        produitId: p.produit._id,
        quantite: p.quantite,
        prixUnitaire: p.produit.prixActuel,
        total: p.totalProduit
      }], { session });

      p.produit.stock -= p.quantite;
      await p.produit.save({ session });
    }

    await session.commitTransaction();
    session.endSession();

    return achat[0];

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

exports.getAll = async () => {
  return await Achat.find().populate('clientId');
};

exports.getById = async (id) => {
  return await Achat.findById(id).populate('clientId');
};