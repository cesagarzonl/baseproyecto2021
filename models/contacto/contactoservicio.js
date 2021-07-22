const { validateEmail} = require('../../utils/isEmail')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const contacto = new Schema({
  nombre: { type: String, require: 'Es obliugatorio un nombre', maxlength: [50, 'El nombre es muy largo'] },
  mensaje:{ type: String },
  correo:{ type: String,validate:[validateEmail,'El correo no cumple con el formato'] },
  url:{type: String},
  procesado:{type:Boolean,default: false},
})

const Contacto = mongoose.model('contacto', contacto)
module.exports = Contacto
