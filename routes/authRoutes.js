const {Router}= require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/authControllers');
const { validationCampos } = require('../middlewares/validationCampos');
const router=Router();


router.post('/login',[
    check('email','El correo es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').notEmpty(),
    validationCampos
], login)
 


module.exports= router;