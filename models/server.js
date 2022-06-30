const express = require('express');
const cors = require('cors');

class Server{ //class
    constructor(){
        //Methods
       this.app = express(); //propiedad 
       this.port=process.env.PORT
       this.usuariosPath='/api/usuarios'
       //Middlewares
       this.middlewares();
       //routes
       this.routes(); 
    }

    middlewares(){
        //CORS
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());

        //Directorio public
        this.app.use(express.static('public'));
       }

    routes(){
        this.app.use(this.usuariosPath,require('../routes/userRoutes'))

    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('listening on port '+ this.port);
        });
    }    
}

module.exports=Server;