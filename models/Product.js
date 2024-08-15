const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    storageLocation: {
      type: String,
    },
    storageDepartment: {
      type: String,
    },
    category: {
      type: String,
      trim: true,
      required: false,
    },
    subCategory1: {
      type: String,
      required: false,
    },
    subCategory2: {
      type: String,
      required: false,
    },
    family: {
      type: String,
      required: false,
    },
    subFamily1: {
      type: String,
      required: false,
    },
    subFamily2: {
      type: String,
      required: false,
    },
    foodType: {
      type: String,
    },

    authorId: {
      type: String,
      required: true,
    }, // Référence à User

    picture: {
      type: String,
      default: "https://example.com/default-profile-picture.jpg", // URL de l'image par défaut
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
