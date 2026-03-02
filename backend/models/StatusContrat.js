const mongoose = require('mongoose');

const StatusContratSchema = new mongoose.Schema({
  nom: {type: String, required: true},
  code: {type: Number, required: true} //{0: 'non paye', 10 : 'paye'}
});

module.exports = mongoose.model('StatusContrat', StatusContratSchema);