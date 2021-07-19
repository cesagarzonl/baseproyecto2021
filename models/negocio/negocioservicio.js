const mongoose = require('mongoose')
const Schema = mongoose.Schema

const negocio = new Schema({
  nombre: { type: String, require: 'Es obliugatorio un nombre', maxlength: [50, 'El nombre es muy largo'] },
  usuario: { type: Schema.Types.ObjectId, ref: 'usuario', require: 'error al crear el servicio' },
  descripcion: { type: String, require: 'Es obliugatorio un correo', maxlength: [100, 'El usuario es muy largo'] },
  fechaCreacion: { type: Date, default: Date.now },
  imagen:{ type: String },
  correo:{ type: String },
  telefono:{type: String},
  instagram:{ type: String },
  facebook:{ type: String },
  whatsapp:{ type: String },
  twitter:{ type: String }
})

const Negocio = mongoose.model('negocio', negocio)
module.exports = Negocio
