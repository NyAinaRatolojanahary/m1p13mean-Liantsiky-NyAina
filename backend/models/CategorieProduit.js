const mongoose = require('mongoose');

const CategorieProduitSchema = new mongoose.Schema({
  nom: {type: String, required: true, unique: true},
  image: String,
  status: { type: Number, default: 10 } // 0 desactive, 10 active
});

module.exports = mongoose.model('CategorieProduit', CategorieProduitSchema);
