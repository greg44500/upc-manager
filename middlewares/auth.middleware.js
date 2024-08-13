const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");

const checkUser = async (req, res, next) => {
  // Lire le cookie 'token'
  const token = req.cookies.jwt;

  // Vérifier si le cookie 'token' existe
  if (!token) {
    return res
      .status(401)
      .json({ message: "Accès refusé, aucun token fourni" });
  }

  try {
    // Vérifier et décoder le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Récupérer l'utilisateur depuis la base de données
    const user = await UserModel.findById(decoded.user.id);
    console.log(user);

    // Si l'utilisateur n'existe pas
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Attacher les informations utilisateur complètes au req
    req.user = user;

    // Passer au middleware suivant ou au contrôleur
    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ message: "Token invalide ou expiré" });
  }
};

const roleCheck = (...roles) => {
  return (req, res, next) => {
    // Assurer que l'utilisateur est authentifié
    if (!req.user) {
      return res
        .status(401)
        .json({ message: "Accès refusé, utilisateur non authentifié" });
    }

    // Vérifier si l'utilisateur possède l'un des rôles requis
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Accès refusé, rôle insuffisant" });
    }

    // Passer au middleware suivant ou au contrôleur
    next();
  };
};

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Accès refusé, aucun token fourni" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      console.error(err);
      return res.status(401).json({ message: "Token invalide ou expiré" });
    } else {
      // Attacher les informations décodées à l'objet req
      req.user = decodedToken;
      next();
    }
  });
};
module.exports = { checkUser, roleCheck, requireAuth };
