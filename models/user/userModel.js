const { validateEmail} = require('../../utils/isEmail')
const mongoose = require('mongoose')
const Schema = mongoose.Schema


const usuario = new Schema({
  usuario: { type: String, require: 'Es obliugatorio un usuario', maxlength: [50, 'El usuario es muy largo'],unique: true},
  email: { type: String, require: 'Es obliugatorio un correo', maxlength: [100, 'El usuario es muy largo'],unique: true,validate:[validateEmail,'El correo no cumple con el formato'] },
  password: { type: String, require: 'Es obliugatorio un contraseña', minlength: [6, 'Minimo 6 caracteres'] },
  fechaCreacion: { type: Date, default: Date.now }
})

const Usuario = mongoose.model('usuario', usuario)
module.exports = Usuario
