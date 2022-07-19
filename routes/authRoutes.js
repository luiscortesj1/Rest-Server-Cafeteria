const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSingIn } = require("../controllers/authControllers");
const { validationCampos } = require("../middlewares/validationCampos");
const router = Router();

router.post(
  "/login",
  [
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").notEmpty(),
    validationCampos,
  ],
  login
);
router.post(
  "/google",
  [
    check("id_token", "Token de google es necesario").notEmpty(),
    validationCampos,
  ],
  googleSingIn
);

module.exports = router;
