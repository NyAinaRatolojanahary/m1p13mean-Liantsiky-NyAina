const mongoose = require('mongoose');

const UtilisateurSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  dtn: Date,
  email: { type: String, unique: true },
  telephone: String,
  adresse: String,
  password: {type: String, required: true},
  role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
  dateCreation: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Utilisateur', UtilisateurSchema);