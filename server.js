const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 8000;
const connectDB = require("./db.js");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes");
const productRoutes = require("./routes/product.routes.js");

app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
connectDB(); //Methode de connexion MongoDB

// JWT

//ROUTES
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
