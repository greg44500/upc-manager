const UserModel = require("../models/User");
const bcrypt = require("bcryptjs");
const ObjectID = require("mongoose").Types.ObjectId;
// @desc : Get all Users
// @Method : GET /api/users/
// @Access : Public
module.exports.getAllUsers = async (req, res) => {
  try {
    //selection de tous les utilisateurs (Sans le password)
    const users = await UserModel.find().select("-password");
    res.status(200).json({ users });
  } catch (error) {
    res.status(404).json({ message: "La ressource n'existe pas" });
  }
};
// @desc : Get user Infos
// @Method : GET /api/users/:id
// @Access : Private
module.exports.userInfo = async (req, res) => {
  try {
    let user = req.params.id;
    if (!ObjectID.isValid(user)) {
      res.status(400).json({ message: "Ressource inconnue" });
    } else {
      let userFound = await UserModel.findById(user).select("-password");
      res.status(200).json({ userFound });
    }
  } catch (error) {
    res.status(400).json({ message: "Une erreur est survenue" });
  }
};

// @desc : Delete user Account
// @Method : Delete /api/users/:id
// @Access : Private and Admin
module.exports.deleteAccount = async (req, res) => {
  try {
    let user = req.params.id;
    if (!ObjectID.isValid(user)) {
      res.status(400).json({ message: "Ressource inconnue" });
    } else {
      let userFound = await UserModel.findByIdAndDelete(user);
      res.status(200).json({ message: "Compte supprimé" });
    }
  } catch (error) {
    res.status(400).json({ message: "Une erreur est survenue" });
  }
};

// @desc : Edit user Info
// @Method : PUT /api/users/:id
// @Access : Private / Admin

module.exports.editAccount = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    // Valider l'ID utilisateur
    if (!ObjectID.isValid(req.params.id)) {
      return res.status(400).json({ message: "ID utilisateur invalide" });
    }

    // Trouver l'utilisateur par son ID
    let user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Mettre à jour les champs s'ils sont fournis
    if (firstname) user.firstname = firstname;
    if (lastname) user.lastname = lastname;
    if (email) user.email = email;

    // Si le mot de passe est fourni, le hacher avant de l'enregistrer
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    // Sauvegarder les modifications
    await user.save();

    // Répondre avec un message de réussite
    res.status(200).json({
      message: ` ${user.firstname} ${user.lastname}, vous venez de mettre à jour vos informations avec succés!`,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur du serveur");
  }
};
