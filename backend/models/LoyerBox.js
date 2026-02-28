const mongoose = require('mongoose');

const LoyerBoxSchema = new mongoose.Schema({
  loyer: {type: Number, required: true},
  boxId: { type: mongoose.Schema.Types.ObjectId, ref: 'Box' },
  dateChangement: { type: Date, default: Date.now },
  dateApplication: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LoyerBox', LoyerBoxSchema);
