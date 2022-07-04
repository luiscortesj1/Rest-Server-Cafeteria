const {Router}= require('express');
const { check } = require('express-validator');
const router=Router();
const controller=require('../controllers/userControllers');
const validators = require('../helpers/db-validators');

const { validationCampos } = require('../middlewares/validationCampos');


/* Otra forma de requerir con destructuracion 
const {userGet,userPut,userPost,userDelete}=require('../controllers/userControllers')
router.get('/', userGet);
router.put('/', userPut);
router.post('/', userPost);
router.delete('/',userDelete); */


router.get('/', controller.userGet);
router.put('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(validators.usuarioIdExistente),
    check('rol').custom(validators.rol),
    validationCampos
], controller.userPut);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(), //para decir que no esta vacio
    /* verificar si el email existe .custom(validators.emailExistente) */
    check('email', 'El correo no es válido').custom(validators.emailExistente),
    check('password', 'El password debe ser más de 6 caracteres').isLength({min:6 }),
    /* check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']), */
    check('rol').custom(validators.rol), //validacion de los roles desde la carpeta helpers
    validationCampos // Middleware que revisa los errores de los check y si pasa se ejecuta el controller 
], controller.userPost);

router.delete('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(validators.usuarioIdExistente),
    validationCampos
],controller.userDelete);


module.exports= router;