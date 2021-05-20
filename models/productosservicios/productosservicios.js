const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productoServicio = new Schema({
  nombre: { type: String, require: 'Es obliugatorio un nombre', maxlength: [50, 'El nombre es muy largo'] },
  user: { type: Schema.Types.ObjectId, ref: 'user', require: 'error al crear el servicio' },
  descripcion: { type: String, require: 'Es obliugatorio un correo', maxlength: [100, 'El usuario es muy largo'] },
  fechaCreacion: { type: Date, default: Date.now },
  imagen:{ type: String }
})

const ProductoServicio = mongoose.model('productoServicio', productoServicio)
module.exports = ProductoServicio
