const mongoose = require("mongoose");
const ProductModel = require("../models/Product");
const ObjectID = require("mongoose").Types.ObjectId;
const UserModel = require("../models/User");

// @desc :Get All Products
// @Method : GET /api/products/
// @Access : Public
const getAllProducts = async (req, res) => {
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

// @desc : Create one product
// @Method : POST /api/products/
// @Access : Private (Admin, storekeeper, manager)
const createProduct = async (req, res) => {
  try {
    // Extraire les données du corps de la requête
    const {
      name,
      storageLocation,
      storageDepartment,
      category,
      subCategory1,
      subCategory2,
      family,
      subFamily1,
      subFamily2,
      foodType,
      authorId,
      picture,
      price,
    } = req.body;

    // Vérifier si tous les champs obligatoires sont présents
    if (!name || !authorId || !price) {
      return res.status(400).json({
        error: "Les champs 'nom', 'authorId' et 'prix' sont obligatoires.",
      });
    }
    let existingProduct = await ProductModel.findOne({ name });
    if (existingProduct) {
      res.status(400).json({ message: "Ce produit existe déjà" });
    } else {
      // Créer une nouvelle instance de Product avec les données fournies
      const newProduct = new ProductModel({
        name,
        storageLocation,
        storageDepartment,
        category,
        subCategory1,
        subCategory2,
        family,
        subFamily1,
        subFamily2,
        foodType,
        authorId,
        picture,
        price,
      });

      // Enregistrer le produit dans la base de données
      await newProduct.save();

      // Envoyer une réponse réussie
      return res.status(201).json({
        message: "Produit créé avec succès.",
        product: newProduct,
      });
    }
  } catch (error) {
    // En cas d'erreur, envoyer une réponse d'erreur
    console.error(error);
    return res.status(500).json({
      error: "Une erreur s'est produite lors de la création du produit.",
    });
  }
};

// @desc :Update one Product
// @Method : PUT /api/products/:id
// @Access : Private (Admin, storekeeper, manager)
const updateProduct = async (req, res) => {
  try {
    let product = req.params.id;
    if (!ObjectID.isValid(product)) {
      res.status(400).json({
        message: "Vous tentez de supprimer un produit qui n'existe pas...",
      });
    } else {
      const productId = req.params.id; // ID du produit à mettre à jour
      const {
        name,
        storageLocation,
        storageDepartment,
        category,
        subCategory1,
        subCategory2,
        family,
        subFamily1,
        subFamily2,
        foodType,
        authorId,
        picture,
        price,
      } = req.body;

      // Vérifier si un autre produit avec le même nom existe déjà
      if (name) {
        const existingProduct = await ProductModel.findOne({ name });
        if (existingProduct) {
          return res
            .status(400)
            .json({ error: "Un produit avec ce nom existe déjà." });
        }
      }

      // Mettre à jour le produit et retourner le document mis à jour
      const updatedProduct = await ProductModel.findByIdAndUpdate(
        productId,
        {
          name,
          storageLocation,
          storageDepartment,
          category,
          subCategory1,
          subCategory2,
          family,
          subFamily1,
          subFamily2,
          foodType,
          authorId,
          picture,
          price,
        },
        { new: true, runValidators: true } // `new: true` retourne le docs mis à jour
      );

      // Vérifier si le produit a été trouvé et mis à jour
      if (!updatedProduct) {
        return res.status(404).json({ error: "Produit non trouvé." });
      }

      // Envoyer une réponse réussie avec le produit mis à jour
      return res.status(200).json({
        message: "Produit mis à jour avec succès !",
        product: updatedProduct,
      });
    }
  } catch (error) {
    // En cas d'erreur, envoyer une réponse d'erreur
    console.error(error);
    return res.status(500).json({
      error: "Une erreur s'est produite lors de la mise à jour du produit !",
    });
  }
};

// @desc : Delete One Product
// @Method : DELETE /api/products/:id
// @Access : Private (Admin)
const deleteProduct = async (req, res) => {
  try {
    let product = req.params.id;
    if (!ObjectID.isValid(product)) {
      res.status(400).json({
        message: "Vous tentez de supprimer un produit qui n'existe pas...",
      });
    } else {
      let productFound = await ProductModel.findByIdAndDelete(product);
      res.status(200).json({ message: "Produit supprimé !" });
    }
  } catch (error) {
    res.status(400).json({ message: "Une erreur est survenue" });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
};
