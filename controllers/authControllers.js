const { response, json } = require("express");
const Usuario = require("../models/usuario")
const bcryptjs= require('bcryptjs');
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");

const login= async (req, res=response)=>{
    const {email, password} = req.body;

    try {
        // Verificar email
        const usuario = await Usuario.findOne({email});

        if(!usuario){
            return res.status(404).json({
                msg:"El usuario o contraseña son incorrectos "
            });
        }

        // Verificar el estado del usuario
        if(!usuario.status){
            return res.status(404).json({
                msg:"El usuario o contraseña son incorrectos "
            });
        }

        //Verificar la constraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if(!validPassword){
            return res.status(404).json({
                msg:"El usuario o contraseña son incorrectos"
            });
        }

        //Generar JWT
        const token= await generarJWT(usuario.id);
        res.json({
            msg:'Login ok',
            usuario,
            token
        })

    } catch (error) {
        return res.status(500).json({
            msg:"Hable con el administrador"
        })
    }
       
}

const googleSingIn= async(req, res=response)=> {
    const {id_token}=req.body;
    
    try {

         const {name,img,email}= await googleVerify(id_token);

         let usuario = await Usuario.findOne({email}); //si el usuario existe
         
         if(!usuario){
            // Toca crear el usuario
            const data={
                name,
                email,
                password:':p',
                img,
                google:true,
                rol: 'USER_ROLE'
            }
            usuario= new Usuario(data);
            await usuario.save();
            
         }

         // si el usuario DB
         if(!usuario.status){
            return res.status(401).json({
                msg:'Usuario bloqueado'
            })
         }

         //JWT 
         const token= await generarJWT(usuario.id);

        res.json({
            usuario,
            token
           }) 

    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:'El token no se pudo verificar'
        })
    }

       
}

module.exports ={
    login,
    googleSingIn
}