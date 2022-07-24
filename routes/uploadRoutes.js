const { Router } = require("express");
const { check } = require("express-validator");
const { cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary } = require("../controllers/uploadControllers");
const validator = require("../helpers/db-validators");
const { validarArchivo, validationCampos } = require("../middlewares");
const router = Router();

router.post('/',validarArchivo,cargarArchivo)

router.put('/:coleccion/:id',[
    validarArchivo,
    check('id','No es un ID de Mongo válido').isMongoId(),
    check('coleccion').custom(c=> validator.coleccionesPermitidas(c,['usuarios', 'productos'])),
    validationCampos
], actualizarImagenCloudinary )

router.get('/:coleccion/:id',[
    check('id','No es un ID de Mongo válido').isMongoId(),
    check('coleccion').custom(c=> validator.coleccionesPermitidas(c,['usuarios', 'productos'])),
    validationCampos
], mostrarImagen)
module.exports = router;
