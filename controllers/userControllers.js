const {response} =require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const controller={

    //GET
    userGet: async(req, res=response)=> {
      const {limit=5, offset=0}=req.query //arguments

      const valStatus={status:true} // validar el status
  
      //para optimizar el tiempo en respuesta de las promesas
      //con el Promise las dos promesas se ejecutan al mismo tiempo en cambio con el await se ejecuta una a la vez
      const [total, usuarios]= await Promise.all([
        Usuario.countDocuments(valStatus), //total de usuarios
        Usuario.find(valStatus)
        .skip(Number(offset)) //desde
        .limit(Number(limit)) //limite
      ])
        res.json({
          total,
          usuarios
        }); 
      },

     //PUT

    userPut: async(req, res=response)=> {
      const id=req.params.id;
      const {_id,password,google,email,...datos}=req.body;

      //TODO validar contra DB
      if(password){

        //encriptar password
        const salt= bcryptjs.genSaltSync();
        datos.password = bcryptjs.hashSync(password,salt);
        // end password
      }
        const usuario = await Usuario.findByIdAndUpdate(id,datos);
        res.json({
            usuario
        }); 
      },

      // POST

    userPost: async (req, res=response)=> {

      
        const {name,email,password,rol} = req.body;
        const usuario= new Usuario({name,email,password,rol});

        //encriptar password
        const salt= bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password,salt);
        // end password

        await usuario.save(); //guardar usuario en mongoDB
        res.json({
            usuario
        }); 
      },

      //DELETE
      
    userDelete:async(req, res=response)=> {
      const {id} = req.params;

      const usuario = await Usuario.findByIdAndUpdate(id,{status:false});
      const usuarioAuth= req.usuario;
      res.json({usuario}); 
      }
    
}

module.exports=controller;

/* //Delete Fisicamente
const usuario = await Usuario.findByIdAndDelete(id); */