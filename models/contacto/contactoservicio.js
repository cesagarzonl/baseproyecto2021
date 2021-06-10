const mongoose = require('mongoose')
const Schema = mongoose.Schema

const contacto = new Schema({
  nombre: { type: String, require: 'Es obliugatorio un nombre', maxlength: [50, 'El nombre es muy largo'] },
  mensaje:{ type: String },
  correo:{ type: String },
  url:{type: String},
  procesado:{type:Boolean,default: false},
})

const Contacto = mongoose.model('contacto', contacto)
module.exports = Contacto
