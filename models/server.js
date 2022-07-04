const express = require('express');
const cors = require('cors');
const { dbConection } = require('../database/config');

class Server{ //class
    constructor(){
        
       this.app = express(); //propiedad 
       this.port=process.env.PORT
       this.usuariosPath='/api/usuarios';

       // Conexion a base de datos 
        this.conexionDB();
       //Middlewares
       this.middlewares();

       //routes
       this.routes(); 
    }

    //Methods

    async conexionDB(){
        await dbConection();
    }

    middlewares(){
        //CORS (middlewares)
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