const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Route POST pour créer un produit
router.post("/", productController.createProduct);
router.get("/", productController.getAllProducts);

router.delete("/:id", productController.deleteProduct);
router.put("/:id", productController.updateProduct);

module.exports = router;
