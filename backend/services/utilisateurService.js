const mongoose = require('mongoose');
const Utilisateur = require('../models/Utilisateur');
const Role = require('../models/Role');
const bcrypt = require("bcryptjs");

exports.createAdminUser = async (data) => {
    
    const existingUser = await Utilisateur.findOne({ email: data.email });
    if (existingUser) throw new Error('Utilisateur déja existant');

    const hashedPassword = await bcrypt.hash(data.email, 10);

    const role = await Role.findOne({ status: 20 });
    if (!role) throw new Error('Role introuvable'); 

    const user = await Utilisateur.create({
        nom: data.nom,
        prenom: data.prenom,
        dtn: data.dtn,
        email: data.email,
        password: hashedPassword,
        role: role
    });

  return user;
};

exports.createBoutiqueUser = async (data) => {
    
    const existingUser = await Utilisateur.findOne({ email: data.email });
    if (existingUser) throw new Error('Utilisateur déja existant');

    const hashedPassword = await bcrypt.hash(data.email, 10);

    const role = await Role.findOne({ status: 10 });
    if (!role) throw new Error('Role introuvable'); 

    const user = await Utilisateur.create({
        nom: data.nom,
        prenom: data.prenom,
        dtn: data.dtn,
        email: data.email,
        password: hashedPassword,
        role: role
    });

  return user;
};

exports.getUserInfo = async (id) => {    
    
    const user = await Utilisateur.findById(id).select('-password').populate('role','nom status');
    if (!user) {
        throw new Error('Utilisateur introuvable');
    }
    return user;
};

exports.getAllUsers = async () => {
  return await Utilisateur
    .find()
    .select('-password')
    .populate('role', 'nom status');
};

exports.getAllUsersPaginated = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    Utilisateur.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }),

    Utilisateur.countDocuments()
  ]);

  return {
    data: users,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
};

exports.getAllUsersByStatusPaginated = async (roleId, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const filter = { role: new mongoose.Types.ObjectId(roleId) };

  const [users, total] = await Promise.all([
    Utilisateur.find(filter)
      .populate('role', 'nom status')
      .skip(skip)
      .limit(limit)
      .sort({ dateCreation: -1 }),
    Utilisateur.countDocuments(filter)
  ]);

  return {
    data: users,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
};

exports.updateUser = async (data) => {
  const { userId, updates } = data;
  const result = await Utilisateur.updateOne(
    { _id: userId },     
    { $set: updates }    
  );

  return result;
};