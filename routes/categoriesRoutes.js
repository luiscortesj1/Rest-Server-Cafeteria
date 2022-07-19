const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();
const { crearCategoria, 
        obtenerCategorias, 
        obtenerCategoria, 
        actualizarCategoria, 
        borrarCategoria} = require("../controllers/categoriesControllers");
const validator = require("../helpers/db-validators");

const { validarJWT, validationCampos, adminRole } = require("../middlewares");

//Categorias

//Get obtener todas las categorias (publico)
router.get("/", obtenerCategorias);

//Get  obtener una categoria (publico)
router.get("/:id",[
  check('id','No es un ID de Mongo válido').isMongoId(),
  check('id').custom(validator.existeCategoria),
  validationCampos,
], obtenerCategoria);

//POST crear una categoria (privado)
router.post("/", [
  validarJWT,
  check('name', 'El nombre es obligatorio').notEmpty(),
  validationCampos
],  crearCategoria);

//PUT actualizar una categoria (privado)
router.put("/:id",[
  validarJWT,
  check('id','No es un ID de Mongo válido').isMongoId(),
  check('name','El nombre es obligatorio').notEmpty(),
  check('id').custom(validator.existeCategoria),
  validationCampos
], actualizarCategoria);

//Delete eliminar una categoria (privado)
router.delete("/:id",[
  validarJWT,
  adminRole,
  check('id','No es un ID de Mongo válido').isMongoId(),
  check('id').custom(validator.existeCategoria),
  validationCampos
], borrarCategoria);

module.exports = router;
