const mongoose =require('mongoose');

const postSchema = mongoose.Schema({
  nombre: {type: String, required: true},
  precio: {type: String, required: true},
  medida: {type: String, required: true},
  descripcion:{type: String, required: true},
  disponibilidad: {type: String, required: true},
  unidades: {type: String, required: true},
  imageUrl: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
})

module.exports = mongoose.model('Post', postSchema);
