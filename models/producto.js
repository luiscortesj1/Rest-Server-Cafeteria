const { Schema, model } = require("mongoose");

const ProductSchema = Schema({
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
  price: {
    type: Number,
    default: 0, //
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Categoria",
    required: true,
  },
  description: { type: String },

  available: { type: Boolean, default: true },
});

ProductSchema.methods.toJSON = function () {
  /* instancia con los valores (objecto literal) se saca __v y status, los demas datos se guardan en producto   */
  const { __v, status, ...data } = this.toObject();

  return data;
};

module.exports = model("Producto", ProductSchema);
