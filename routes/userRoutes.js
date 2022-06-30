const {Router}= require('express');
const router=Router();
const controller=require('../controllers/userControllers')

/* Otra forma de requerir con destructuracion 
const {userGet,userPut,userPost,userDelete}=require('../controllers/userControllers')
router.get('/', userGet);
router.put('/', userPut);
router.post('/', userPost);
router.delete('/',userDelete); */


router.get('/', controller.userGet);
router.put('/:id', controller.userPut);
router.post('/', controller.userPost);
router.delete('/',controller.userDelete);


module.exports= router;