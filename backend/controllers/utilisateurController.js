const utilisateurService = require('../services/utilisateurService');
const ROLES  = require('../constants/roles');

exports.getProfile = async (req, res) => {
  try {
    const user = await utilisateurService.getUserInfo(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProfileById = async (req, res) => {
  try {
    const userId = req.params.id; 
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    if (req.user.role.status !== ROLES.ADMIN) {
      return res.status(403).json({ message: "Accès interdit : seulement admin" });
    }
    const user = await utilisateurService.getUserInfo(userId);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllUsers = async (req,res) => {
    try {
        const users = await utilisateurService.getAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.getAllUsersPaginated = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const result = await utilisateurService.getAllUsersPaginated(page, limit);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getAllUsersByStatusPaginated = async (req, res) => {
  try {
    const { status } = req.query;

    if (!status) {
      return res.status(400).json({ message: "status is required" });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const result = await utilisateurService.getAllUsersByStatusPaginated(
      status,
      page,
      limit
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createShopUser =  async (req, res) => {
  try {
    const shop = await utilisateurService.createBoutiqueUser(req.body);
    res.status(201).json(shop);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

exports.createAdminUser = async (req, res) => {
  try {
    const admin = await utilisateurService.createAdminUser(req.body);
    res.status(201).json(admin)
  } catch (err) {
    res.status(500).json({ message: err.message});
  }
}

exports.updateUserInfo = async (req, res) => {
  try {
    const update = await utilisateurService.updateUser(req.body);
    res.status(201).json(update)
  } catch (err) {
    res.status(500).json({ message: err.message});
  }
}