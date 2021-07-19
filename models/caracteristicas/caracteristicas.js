const mongoose = require('mongoose')
const Schema = mongoose.Schema

const caracteristicas = new Schema({
  productoServicio: { type: Schema.Types.ObjectId, ref: 'productoServicio', require: 'error al crear la caracteretistica' },
  descripcion: { type: String, require: 'Es obliugatorio un correo', maxlength: [100, 'El usuario es muy largo'] },
  usuario: { type: Schema.Types.ObjectId, ref: 'usuario', require: 'error al crear el servicio' },
  fechaCreacion: { type: Date, default: Date.now }
})

const Caracteristicas = mongoose.model('caracteristicas', caracteristicas)
module.exports = Caracteristicas