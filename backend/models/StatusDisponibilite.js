const mongoose = require('mongoose');

const StatusDisponibiliteSchema = new mongoose.Schema({
  nom: {type: String, required: true},
  code: {type: Number, required: true}
});

module.exports = mongoose.model('StatusDisponibilite', StatusDisponibiliteSchema);