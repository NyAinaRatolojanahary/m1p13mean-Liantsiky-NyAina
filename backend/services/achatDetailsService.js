const AchatDetails = require('../models/AchatDetails');

exports.getByAchatId = async (achatId) => {
  return await AchatDetails.find({ achatId })
    .populate('produitId')
    .populate('achatId');
};

exports.getAll = async () => {
  return await AchatDetails.find()
    .populate('produitId')
    .populate('achatId');
};

exports.getById = async (id) => {
  return await AchatDetails.findById(id)
    .populate('produitId')
    .populate('achatId');
};

exports.delete = async (id) => {
  return await AchatDetails.findByIdAndDelete(id);
};