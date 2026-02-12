const Utilisateur = require("../models/Utilisateur");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Role = require('../models/Role');


exports.register = async (data) => {
    
    const existingUser = await Utilisateur.findOne({ email: data.email });
    if (existingUser) throw new Error('Utilisateur déja existant');

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const role = await Role.findOne({ status: 1 });

    console.log(role);

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

exports.login = async (email, password) => {
  const user = await Utilisateur.findOne({ email }).populate('role');

  if (!user) throw new Error('Utilisateur introuvable');

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new Error('Mot de passe incorrect');

//   if (!user.status) throw new Error('Compte désactivé');

  const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: {
            nom: user.role.nom,
            status: user.role.status
        }
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "24h" }
    );

  return { user, token };
};
