require("dotenv").config(); //paquete dotenv .config es para que tome todo el archivo env
const Server = require("./models/server"); //require server

const server = new Server();
server.listen(); //levantar servidor
server.middlewares();
