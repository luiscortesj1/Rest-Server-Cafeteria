const { Router } = require("express");
const { search } = require("../controllers/searchControllers");
/* const { check } = require("express-validator");
const { login, googleSingIn } = require("../controllers/authControllers");
const { validationCampos } = require("../middlewares/validationCampos"); */

const router = Router();

router.get("/:coleccion/:termino", search);


module.exports = router;