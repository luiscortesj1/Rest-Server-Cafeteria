const express = require("express");
const cors = require("cors");
const { dbConection } = require("../database/config");

class Server {
  //class
  constructor() {
    this.app = express(); //propiedad
    this.port = process.env.PORT;

    /* //Ruta Auth
       this.authPath='/api/auth';
       
       //Ruta Categorias
       this.categoriasPath='/api/categorias';
       
       //Ruta Usuario
       this.usuariosPath='/api/usuarios';
        */
    this.paths = {
      auth: "/api/auth",
      buscar: "/api/buscar",
      categorias: "/api/categorias",
      usuarios: "/api/usuarios",
      productos: "/api/productos",
    };
    // Conexion a base de datos
    this.conexionDB();
    //Middlewares
    this.middlewares();

    //routes
    this.routes();
  }

  //Methods

  async conexionDB() {
    await dbConection();
  }

  middlewares() {
    //CORS (middlewares)
    this.app.use(cors());

    //Lectura y parseo del body
    this.app.use(express.json());

    //Directorio public
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.paths.auth, require("../routes/authRoutes"));
    this.app.use(this.paths.buscar, require("../routes/searchRoutes"));
    this.app.use(this.paths.categorias, require("../routes/categoriesRoutes"));
    this.app.use(this.paths.productos, require("../routes/productsRoutes"));
    this.app.use(this.paths.usuarios, require("../routes/userRoutes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("listening on port " + this.port);
    });
  }
}

module.exports = Server;
