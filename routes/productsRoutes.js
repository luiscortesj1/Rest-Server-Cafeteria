const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();
const { crearProducto, 
        obtenerProductos, 
        obtenerProducto, 
        actualizarProducto, 
        borrarProducto} = require("../controllers/productsController");
const validator = require("../helpers/db-validators");

const { validarJWT, validationCampos, adminRole } = require("../middlewares");

//productos

//Get obtener todos los productos (publico)
router.get("/", obtenerProductos);

//Get  obtener un producto (publico)
router.get("/:id",[
  check('id','No es un ID de Mongo válido').isMongoId(),
  check('id').custom(validator.existeProducto),
  validationCampos,
], obtenerProducto);

//POST crear una categoria (privado)
router.post("/", [
  validarJWT,
  check('name', 'El nombre es obligatorio').notEmpty(),
  check('category', 'No es un ID de Mongo').isMongoId(),
  check('category').custom(validator.existeCategoria),
  validationCampos
],  crearProducto);

//PUT actualizar una categoria (privado)
router.put("/:id",[
  validarJWT,
  check('id','No es un ID de Mongo válido').isMongoId(),
  check('id').custom(validator.existeProducto),
  validationCampos
], actualizarProducto);

//Delete eliminar una categoria (privado)
router.delete("/:id",[
  validarJWT,
  adminRole,
  check('id','No es un ID de Mongo válido').isMongoId(),
  check('id').custom(validator.existeProducto),
  validationCampos
], borrarProducto);

module.exports = router;
