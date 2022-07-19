const { response } = require("express");
const { Categoria } = require("../models/index");

//Obtener Categorias - paginado - total - populate
const obtenerCategorias = async (req, res = response) => {
  const { limit = 5, offset = 0 } = req.query; //arguments

  const valStatus = { status: true }; // validar el status

  //para optimizar el tiempo en respuesta de las promesas
  //con el Promise las dos promesas se ejecutan al mismo tiempo en cambio con el await se ejecuta una a la vez
  const [total, categoria] = await Promise.all([
    Categoria.countDocuments(valStatus), //total de categoria
    Categoria.find(valStatus)
      .populate("user", "name") // referencia de creacion de la categoria
      .skip(Number(offset)) //desde
      .limit(Number(limit)), //limite
  ]);
  res.json({
    total,
    categoria,
  });
};

//Obtener Categoria - total - populate
const obtenerCategoria = async (req, res = response) => {
  const { id } = req.params;
  const categoria = await Categoria.findById(id).populate("user", "name");
  if (categoria.status == false) {
    return res.status(404).json({
      msg: "Categoria no disponible",
    });
  }
  res.json(categoria);
};

// Crear Categoria
const crearCategoria = async (req, res = response) => {
  const name = req.body.name.toUpperCase();

  const categoriaDB = await Categoria.findOne({ name });

  if (categoriaDB) {
    return res.status(400).json({
      msg: `La categoria ${categoriaDB.name}, ya existe`,
    });
  }

  //Generar la Data guardar
  const data = { name, user: req.usuario._id };

  const categoria = new Categoria(data);

  //Guardar DB
  await categoria.save();

  res.status(201).json(categoria);
};

// Actualizar Categoria
const actualizarCategoria = async (req, res = response) => {
  const { id } = req.params;
  const { status, user, ...data } = req.body;

  data.name = data.name.toUpperCase();
  data.user = req.usuario._id;

  const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });

  res.json(categoria);
};

//Eliminar Categoria
const borrarCategoria = async (req, res = response) => {
  const {id}=req.params;
  categoriaBorrada=await Categoria.findByIdAndUpdate(id,{status:false},{new: true});
  res.json(categoriaBorrada);
};

module.exports = {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria
};
