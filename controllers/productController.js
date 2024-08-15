const mongoose = require("mongoose");
const ProductModel = require("../models/Product");
const UserModel = require("../models/User");

module.exports.getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();
    if (!products) {
      res.status(404).json({ message: "Ressource introuvable" });
    } else if (products.length === 0) {
      res.status(200).json({ message: "Pas de produits à proposer" });
    } else if (products.length > 0) {
      res.status(200).json({ products });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports.createProduct = async (req, res) => {
  try {
    const { name, category, subcategory, family, subFamily, price, author } =
      req.body;
  } catch (error) {}
};
