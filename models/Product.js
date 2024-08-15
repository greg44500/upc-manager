const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    category: {
      type: String,
      trim: true,
      required: false,
    },
    subCategory: {
      type: String,
      required: false,
    },
    Family: {
      type: String,
      required: false,
    },
    subFamily: {
      type: String,
      required: false,
    },

    authorId: {
      type: String,
      required: true,
    }, // Référence à User

    Picture: {
      type: String,
      default: "https://example.com/default-profile-picture.jpg", // URL de l'image par défaut
    },
    Price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
