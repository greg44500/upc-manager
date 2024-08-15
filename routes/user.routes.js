const router = require("express").Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const requireAuth = require("../middlewares/auth.middleware");

//AUTHENTICATION
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);
//USERS ROUTES
router.get("/", userController.getAllUsers);
router.get("/:id", requireAuth, userController.userInfo);
router.delete("/:id", userController.deleteAccount);
router.put("/:id", userController.editAccount);

module.exports = router;
