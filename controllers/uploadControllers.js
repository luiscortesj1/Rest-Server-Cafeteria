const { response } = require("express");
const { subirArchivo } = require("../helpers/");
const { Usuario, Producto } = require("../models");

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

  const name = await subirArchivo(req.files, undefined, coleccion);

  modelo.img = name;

  await modelo.save();

  res.json({ modelo});
};

module.exports = {
  cargarArchivo,
  actualizarImagen,
};
