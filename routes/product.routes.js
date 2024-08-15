const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Route POST pour créer un produit
router.get("/", productController.getAllProducts);

module.exports = router;
