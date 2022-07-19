const { response } = require("express");
const { Producto } = require("../models/index");

//Obtener Productos - paginado - total - populate
const obtenerProductos = async (req, res = response) => {
  const { limit = 5, offset = 0 } = req.query; //arguments

  const valStatus = { status: true }; // validar el status

  //para optimizar el tiempo en respuesta de las promesas
  //con el Promise las dos promesas se ejecutan al mismo tiempo en cambio con el await se ejecuta una a la vez
  const [total, producto] = await Promise.all([
    Producto.countDocuments(valStatus), //total de producto
    Producto.find(valStatus)
      .populate("user", "name") // referencia de creacion de la producto
      .populate("category", "name") 
      .skip(Number(offset)) //desde
      .limit(Number(limit)), //limite
  ]);
  res.json({
    total,
    producto,
  });
};

//Obtener producto - total - populate
const obtenerProducto = async (req, res = response) => {
  const { id } = req.params;
  const producto = await Producto.findById(id).populate("user", "name").populate("category", "name");
  if (producto.status == false) {
    return res.status(404).json({
      msg: "Producto no disponible",
    });
  }
  res.json(producto);
};

// Crear Producto
const crearProducto = async (req, res = response) => {
  const {status,user,...body} = req.body;

  const productoDB = await Producto.findOne({ name:body.name.toUpperCase()});
    
  if (productoDB) {
    return res.status(400).json({
      msg: `El producto ${productoDB.name}, ya existe`,
    });
  }

  //Generar la Data guardar
  const data = { ...body,name:body.name.toUpperCase(), user: req.usuario._id };

  const producto = new Producto(data);

  //Guardar DB
  await producto.save();

  res.status(201).json(producto);
};

// Actualizar Producto
const actualizarProducto = async (req, res = response) => {
  const { id } = req.params;
  const { status, user, ...data } = req.body;

  if(data.name){
      data.name = data.name.toUpperCase();
  }

  data.user = req.usuario._id;

  const producto = await Producto.findByIdAndUpdate(id, data, { new: true });

  res.json(producto);
};

//Eliminar Producto
const borrarProducto = async (req, res = response) => {
  const {id}=req.params;
  productoBorrado=await Producto.findByIdAndUpdate(id,{status:false},{new: true});
  res.json(productoBorrado);
};

module.exports = {
  crearProducto,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  borrarProducto
};