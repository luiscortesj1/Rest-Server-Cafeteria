const { response } = require("express");
const { isValidObjectId } = require("mongoose");
const { Usuario, Categoria, Producto } = require("../models");
const coleccionesPermitidas = ["categorias", "productos",  "usuarios"];

const buscarUsuarios = async (termino = "", res = response) => {
  const esMongoID = isValidObjectId(termino);

  //Busquea por ID
  if (esMongoID) {
    const usuario = await Usuario.findById(termino);
    return res.json({
      results: usuario ? [usuario] : [], // ternario si usuario existe devuelve [usuario] si no devuelve uno vacio;
    });
  }

  //Buscar por nombre
  const regex = new RegExp(termino, "i"); // busqueda más flexible

  //devolveria la cantidad de usuarios con esas caracteristicas con el count
  /* const usuarios = await Usuario.count({ 
    $or: [{name: regex,},{email: regex}], 
    $and:[{status: true}] 
  }); */
  const usuarios = await Usuario.find({
    $or: [{ name: regex }, { email: regex }], // or para buscar por mas de un termino
    $and: [{ status: true }], // si o si debe estar true el usuario
  });
  res.json({
    results: usuarios,
  });
};

const buscarCategorias = async (termino = "", res = response) => {
  const esMongoID = isValidObjectId(termino);

  //Busquea por ID
  if (esMongoID) {
    const categoria = await Categoria.findById(termino);
    return res.json({
      results: categoria ? [categoria] : [], // ternario si categoria existe devuelve [categoria] si no devuelve uno vacio;
    });
  }

  //Buscar por nombre
  const regex = new RegExp(termino, "i"); // busqueda más flexible
  const categorias = await Categoria.find({
    $or: [{ name: regex }], // or para buscar por mas de un termino
    $and: [{ status: true }], // si o si debe estar true el categoria
  });
  res.json({
    results: categorias,
  });
};

const buscarProductos = async (termino = "", res = response) => {
  const esMongoID = isValidObjectId(termino);

  //Busquea por ID
  if (esMongoID) {
    const producto = await Producto.findById(termino).populate('category','name');
    return res.json({
      results: producto ? [producto] : [], // ternario si producto existe devuelve [producto] si no devuelve uno vacio;
    });
  }

  //Buscar por nombre
  const regex = new RegExp(termino, "i"); // busqueda más flexible
  const productos = await Producto.find({
    $or: [{ name: regex }, { description: regex }], // or para buscar por mas de un termino
    $and: [{ status: true }], // si o si debe estar true el producto
  }).populate('category','name');
  res.json({
    results: productos,
  });
};

const search = (req, res = response) => {
  const { coleccion, termino } = req.params;

  if (!coleccionesPermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`,
    });
  }
  switch (coleccion) {
    case "categorias":
      buscarCategorias(termino, res);
      break;
    case "productos":
      buscarProductos(termino, res);
      break;
    case "usuarios":
      buscarUsuarios(termino, res);
      break;

    default:
      res.status(500).json({
        msg: "Búsqueda no disponible",
      });
  }
};

module.exports = { search };
