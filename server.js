const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 8000;
const connectDB = require("./db.js");

const userRoutes = require("./routes/user.routes");

app = express();
app.use(express.json());
connectDB(); //Methode de connexion MongoDB

//ROUTES
app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
