const { Schema, model } = require("mongoose");

const CategoriaSchema = Schema({
  name: {
    type: String,
    requied: [true, "El nombre es obligatorio"],
    unique: true,
  },

  status: {
    type: Boolean,
    default: true,
    required: true,
  },

  user: {
    type: Schema.Types.ObjectId, // otro objecto de referencia
    ref: "Usuario", // apunta a usuario
    required: true,
  },
});

//Quitar el password de la responsive
CategoriaSchema.methods.toJSON = function () {
  /* instancia con los valores (objecto literal) se saca __v y status, los demas datos se guardan en categoria   */
  const { __v, status, ...data } = this.toObject();

  return data;
};

module.exports = model("Categoria", CategoriaSchema);
