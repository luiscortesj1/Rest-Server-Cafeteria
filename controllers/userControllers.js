const {response} =require('express');

const controller={

    userGet:(req, res=response)=> {
      const query = req.query;
        res.json({
            msg:'get API - controller',
            query
        }); 
      },
    userPut:(req, res=response)=> {
      const id=req.params.id;
        res.json({
            msg:'put API - controller',
            id
        }); 
      },
    userPost:(req, res=response)=> {
        const {nombre,edad}= req.body;
        res.json({
            msg:'post API - controller',
            nombre,
            edad
        }); 
      },
    userDelete: (req, res=response)=> {
        res.json({
            msg:'delete API - controller'
        }); 
      }
    
}

module.exports=controller;