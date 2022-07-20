const { Router } = require("express");
const { check } = require("express-validator");
const { cargarArchivo } = require("../controllers/uploadControllers");
const { validationCampos } = require("../middlewares/validationCampos");
const router = Router();

router.post('/',[],cargarArchivo)

module.exports = router;
