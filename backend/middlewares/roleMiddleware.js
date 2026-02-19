module.exports = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({ message: "Utilisateur non authentifié" });
    }
    const userRoleStatus = req.user.role.status;

    if (!roles.includes(userRoleStatus)) {
      return res.status(403).json({ message: "Accès interdit" });
    }

    next();
  };
};