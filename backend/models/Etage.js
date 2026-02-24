const mongoose = require('mongoose');

const EtageSchema = new mongoose.Schema({
  nom: {type: String, required : true}
});

module.exports = mongoose.model('Etage', EtageSchema);
