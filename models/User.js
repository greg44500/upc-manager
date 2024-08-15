const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcryptjs");
const roles = ["admin", "manager", "user", "storekeeper"];

// regex pour le mot de passe (4-8 caratères, 1 Maj, 1 Chiffre, 1 symbole)
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Z\d\W_]{4,8}$/;

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      trim: true,
      required: false,
    },
    lastname: {
      type: String,
      trim: true,
      required: false,
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 255,
    },
    role: {
      type: String,
      enum: roles, // Utilisation de l'énum pour restreindre les valeurs possibles
      default: "user", // Valeur par défaut si aucun rôle n'est spécifié
    },
    profilePicture: {
      type: String,
      default: "https://example.com/default-profile-picture.jpg", // URL de l'image par défaut
    },
  },
  { timestamps: true }
);

// Middleware pour le hachage du mot de passe avant de sauvegarder l'utilisateur
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
