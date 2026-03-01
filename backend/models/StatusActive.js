const mongoose = require('mongoose');

const StatusActiveSchema = new mongoose.Schema({
  nom: {type: String, required: true},
  code: {type: Number, required: true}
});

module.exports = mongoose.model('StatusActive', StatusActiveSchema);