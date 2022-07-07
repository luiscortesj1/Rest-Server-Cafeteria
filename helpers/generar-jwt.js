const jwt= require('jsonwebtoken');

const generarJWT=(uid)=>{ //uid = user identify
  return new Promise ((resolve,reject)=>{
    //headers,playload, Signature o firma
    const playload={uid};
    jwt.sign(playload,process.env.SECRETORPRIVATEKEY, //llave secreta
        {expiresIn:'4h'},(err,token)=>{ //expireIn=tiempo de caducidad
            if(err){
               console.log(err);
               reject('No se pudo generar el token'); 
            }else{
                resolve(token);
            }
        })


  })//End Promise
}

module.exports={
    generarJWT
}