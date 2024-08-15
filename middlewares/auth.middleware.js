const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");

const requireAuth = async (req, res, next) => {
  const token = req.cookies.jwt; // Récupérer le token depuis les cookies

  if (!token) {
    return res
      .status(401)
      .json({ message: "Accès refusé. Aucun token fourni." });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
    if (err) {
      console.error("Token invalide ou expiré:", err);
      return res.status(401).json({ message: "Token invalide ou expiré." });
    }

    try {
      // Recherche de l'utilisateur avec l'ID décodé du token
      const user = await UserModel.findById(decodedToken.user.id).select(
        "-password"
      );
      console.log(user);
      if (!user) {
        return res.status(401).json({ message: "Utilisateur non trouvé." });
      }

      // Attacher l'utilisateur décodé à req.user
      req.user = user;
      next(); // Continuer vers la route ou middleware suivant
    } catch (error) {
      console.error("Erreur lors de la recherche de l'utilisateur:", error);
      return res.status(500).json({ message: "Erreur du serveur." });
    }
  });
};

module.exports = requireAuth;
