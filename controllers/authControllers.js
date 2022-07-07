const { response } = require("express");
const Usuario = require("../models/usuario")
const bcryptjs= require('bcryptjs');
const { generarJWT } = require("../helpers/generar-jwt");

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

module.exports ={
    login,
}