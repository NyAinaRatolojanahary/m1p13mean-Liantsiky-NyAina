module.exports = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Utilisateur non authentifié" });
    }
    console.log(req.user);
    const userRoleStatus = req.user.role.status;

    if (!roles.includes(userRoleStatus)) {
      return res.status(403).json({ message: "Accès interdit" });
    }

    next();
  };
};