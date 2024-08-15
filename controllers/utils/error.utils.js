module.exports.signUpErrors = (error) => {
  let errors = { email: "", password: "Mot de passe erroné" };
  if (error.message.includes("email"))
    errors.email = "Email invalide ou déjà pris";
  if (error.message.includes("password"))
    errors.password = "Le mot de passe doit faire entre 6 et 24 caractères";
  if (error.code === 11000 && Object.keys(err.keyValue)[0].includes("email")) {
    errors.email = "Cet email est déjà enregistré";
  }
  return errors;
};
