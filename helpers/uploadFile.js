const path = require("path");
const { v4: uuidv4 } = require("uuid"); // npm i uuid;

const subirArchivo = (files, extensionesValidas = ["png", "jpg", "jpeg", "git"] , carpeta='') => {

  return new Promise((resolve, reject) => {

     // request  viene archivo
  const { archivo } = files;
  const nombreCortado = archivo.name.split(".");
  const extension = nombreCortado[nombreCortado.length - 1];

  //Validar extensiones
  if (!extensionesValidas.includes(extension)) {
    return reject(`La extensión ${extension} no es permitida, ${extensionesValidas}`);
  }

  const nombreTemp = uuidv4() + "." + extension;

  const uploadPath = path.join(__dirname, "../uploads/",carpeta, nombreTemp);

  // Use the mv() method to place the file somewhere on your server
  archivo.mv(uploadPath, (err) => {
    if (err) reject(err);

    resolve(nombreTemp);
  });
  });

 
};

module.exports = {
  subirArchivo,
};
