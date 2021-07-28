const mongoose =require('mongoose');

const postSchema = mongoose.Schema({
  nombre: {type: String, required: true},
  precio: {type: Number, required: true},
  medida: {type: String, required: true},
  descripcion:{type: String, required: true},
  disponibilidad: {type: Boolean, required: true},
  unidades: {type: Number, required: true},
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
})

module.exports = mongoose.model('Post', postSchema);
