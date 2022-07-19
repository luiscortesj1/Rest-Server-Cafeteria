const {Usuario, Role,Categoria, Producto} = require("../models/");

const validator = {
  //funcion para validar los roles
  rol: async (rol = "") => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
      throw new Error(`El rol ${rol} no está registado en la DB`);
    }
  },

  //verificar correo
  emailExistente: async (email = "") => {
    const findEmail = await Usuario.findOne({ email });
    if (findEmail) {
      throw new Error("El correo ya está registrado");
    }
  },

  //Verificar id usuario
  usuarioIdExistente: async (id) => {
    const findId = await Usuario.findById(id);
    if (!findId) {
      throw new Error(`El Id: ${id} no existe`);
    }
  },

  //verificar Categoria
  existeCategoria:async (id) => {
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
      throw new Error(`El Id: ${id} no existe`);
    }
  } ,
  //verificar Producto
  existeProducto:async (id) => {
    const existeProducto = await Producto.findById(id);
    if (!existeProducto) {
      throw new Error(`El Id: ${id} no existe`);
    }
  } 
};

module.exports = validator;
