const { response } = require("express");
const { subirArchivo } = require("../helpers/");


const cargarArchivo = async (req, res = response) => {

  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    return res.status(400).json({ msg: "No hay archivos para subir." });
  }
  
  try {
    /* const name= await subirArchivo(req.files,['txt', 'md'],'textos'); */ // pasa el archivo,los archivos validos y la carpeta donde se va guardar. Gracias a  "createParentPath: true"
    const name= await subirArchivo(req.files,undefined,'imgs'); // undefined es para que tome los archivos por defectos en la funcion subirArchivos que esta en el helpers
    res.json({
      name
    })
    
  } catch (msg) {
    res.status(400).json({msg});
  }
  
};

module.exports = {
  cargarArchivo,
};
