const mongoose  = require('mongoose');
const Box = require('../models/Box');

exports.createBox = async (data) => {
    const box = await Box.create({
        nom: data.nom,
        espacem2: data.espacem2,
        loyer: data.loyer,
        etageId: data.etageId
    });
    return box;
}
exports.getAllBoxes = async () => {
  return await Box
    .find()
    .populate('etageId', 'nom'); // populate etageId with nom field
};

exports.getAllBoxesPaginated = async (page = 1, limit = 2) => {
  const skip = (page - 1) * limit;

  const [boxes, total] = await Promise.all([
    Box.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate('etageId', 'nom'), // populate etageId with nom field

    Box.countDocuments()
  ]);

  return {
    data: boxes,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
}