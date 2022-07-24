const { response } = require("express");
const { subirArchivo } = require("../helpers/");
const { Usuario, Producto } = require("../models");
const path = require("path");
const  fs  = require("fs");

const cargarArchivo = async (req, res = response) => {
  try {
    /* const name= await subirArchivo(req.files,['txt', 'md'],'textos'); */ // pasa el archivo,los archivos validos y la carpeta donde se va guardar. Gracias a  "createParentPath: true"
    const name = await subirArchivo(req.files, undefined, "imgs"); // undefined es para que tome los archivos por defectos en la funcion subirArchivos que esta en el helpers
    res.json({
      name,
    });
  } catch (msg) {
    res.status(400).json({ msg });
  }
};

const actualizarImagen = async (req, res = response) => {
  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);

      if (!modelo) {
        return res.status(400).json({
          msg: `No existe el usuario: ${id}`,
        });
      }

      break;

    case "productos":
      modelo = await Producto.findById(id);

      if (!modelo) {
        return res.status(400).json({
          msg: `No existe el producto: ${id}`,
        });
      }

      break;

    default:
      return res.status(500).send({ msg: "Validations Error" });
  }

  // Limpiar iamgenes anteriores
  if (modelo.img) {
      // Hay que borrar la iamgen del servidor
      const pathImagen= path.join(__dirname,'../uploads',coleccion,modelo.img);
      if(fs.existsSync(pathImagen)){ //existe el archivo
          fs.unlinkSync(pathImagen); //borra el archivo
      }
  }

  const name = await subirArchivo(req.files, undefined, coleccion);

  modelo.img = name;

  await modelo.save();

  res.json({ modelo });
};

const mostrarImagen= async (req, res = response) => {

  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);

      if (!modelo) {
        return res.status(400).json({
          msg: `No existe el usuario: ${id}`,
        });
      }

      break;

    case "productos":
      modelo = await Producto.findById(id);

      if (!modelo) {
        return res.status(400).json({
          msg: `No existe el producto: ${id}`,
        });
      }

      break;

    default:
      return res.status(500).send({ msg: "Validations Error" });
  }

  // Limpiar iamgenes anteriores
  if (modelo.img) {
      // Hay que borrar la iamgen del servidor
      const pathImagen= path.join(__dirname,'../uploads',coleccion,modelo.img);
      if(fs.existsSync(pathImagen)){ //existe el archivo
          return res.sendFile(pathImagen); //devolver el archivo 
      }
  }

  // si no existe image retorna una por default
  const pathImagen=path.join(__dirname,'../assets','no-image.jpg')
    res.sendFile(pathImagen); //devolver el archivo
  
}

module.exports = {
  cargarArchivo,
  actualizarImagen,
  mostrarImagen
};
