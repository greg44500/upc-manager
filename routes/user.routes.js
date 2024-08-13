const router = require("express").Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

//AUTHENTICATION
router.post("/register", authController.signUp);

//USERS ROUTES
router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
router.delete("/:id", userController.deleteAccount);
router.put("/:id", userController.editAccount);
module.exports = router;
