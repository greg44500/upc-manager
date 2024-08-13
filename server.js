const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 8000;
const connectDB = require("./db.js");
const cookieParser = require("cookie-parser");
const { checkUser, requireAuth } = require("./middlewares/auth.middleware.js");
const userRoutes = require("./routes/user.routes");

app = express();
app.use(express.json());
app.use(cookieParser());
connectDB(); //Methode de connexion MongoDB

// JWT
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  console.log("RESPONSE", req.user); // Utiliser req.user pour accéder aux données du token
  res.status(200).send(req.user); // Envoyer req.user comme réponse
});
//ROUTES
app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
