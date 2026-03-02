const mongoose = require('mongoose');

const JetonSchema = new mongoose.Schema({
  nom: String,
  montant: Number,
  status: { type: mongoose.Schema.Types.ObjectId, ref: 'StatusActive' } // 0 desactive, 10 active
});

module.exports = mongoose.model('Jeton', JetonSchema);
