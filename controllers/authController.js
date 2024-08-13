const UserModel = require("../models/User");
const bcrypt = require("bcryptjs");

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
    res.status(200).send(error);
  }
};
module.exports.signIn = async (req, res) => {
  try {
  } catch (error) {}
};
