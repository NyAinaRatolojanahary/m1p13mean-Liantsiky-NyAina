const Portefeuille = require('../models/Portefeuille');
const Virement = require('../models/VirementPortefeuille');

exports.getSolde = async (userId) => {
  return await Portefeuille.findOne({ userId });
};

exports.crediter = async (userId, montant) => {
  const portefeuille = await Portefeuille.findOne({ userId });

  portefeuille.solde_actuel += montant;
  await portefeuille.save();

  await Virement.create({
    montant,
    portefeuilleId: portefeuille._id,
    origine: 'ACHAT_JETON'
  });

  return portefeuille;
};

exports.debiter = async (userId, montant) => {
  const portefeuille = await Portefeuille.findOne({ userId });

  if (portefeuille.solde_actuel < montant) {
    throw new Error('Solde insuffisant');
  }

  portefeuille.solde_actuel -= montant;
  await portefeuille.save();

  await Virement.create({
    montant: -montant,
    portefeuilleId: portefeuille._id,
    origine: 'ACHAT_PRODUIT'
  });

  return portefeuille;
};