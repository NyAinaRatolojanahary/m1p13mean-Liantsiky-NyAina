const mongoose = require('mongoose');

const CategorieProduitSchema = new mongoose.Schema({
  nom: { type: String, required: true, unique: true },
  image: { type: String, default: 'assets/img/categories/cat-1.jpg' },
  status: { type: mongoose.Schema.Types.ObjectId, ref: 'StatusActive' } // 0 desactive, 10 active
});

module.exports = mongoose.model('CategorieProduit', CategorieProduitSchema);
