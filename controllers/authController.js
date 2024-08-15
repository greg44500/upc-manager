const UserModel = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { signUpErrors } = require("./utils/error.utils");

module.exports.signUp = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Vérifier si l'utilisateur existe déjà
    let user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "L'utilisateur existe déjà" });
    } else {
      //Création de l'utilisateur valide
      const newUser = await UserModel.create({
        email,
        password,
      });
    }
    res
      .status(201)
      .json({ message: `${email} :  votre compte a été créé avec succés` });
  } catch (error) {
    const errors = signUpErrors(error);
    res.status(200).send({ errors });
  }
};
module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Vérifier si l'utilisateur existe
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Utilisateur non trouvé" });
    }

    // Comparer le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Authentification incorrecte" });
    }

    // Créer un payload pour le JWT
    const payload = {
      user: {
        id: user._id,
        role: user.role,
      },
    };

    // Signer le JWT
    const maxAge = 3 * 24 * 60 * 60 * 1000;
    jwt.sign(
      payload,
      process.env.JWT_SECRET, // La clé secrète doit être stockée dans une variable d'environnement
      { expiresIn: maxAge }, // Le jeton expire dans 1 heure
      (err, token) => {
        if (err) throw err;
        res.cookie("jwt", token, {
          httpOnly: true,
          secure: true, // Utilisez `true` en production pour HTTPS
          sameSite: "Strict",
          maxAge: maxAge,
        });
        res.status(200).json({ message: "Vous êtes connecté(e) !" });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur du serveur");
  }
};

module.exports.logout = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0), // Expire immédiatement
    secure: true, // Utilisez `true` en production pour HTTPS
    sameSite: "Strict",
  });

  res.status(200).json({ message: "Déconnexion réussie, cookie supprimé" });
};
