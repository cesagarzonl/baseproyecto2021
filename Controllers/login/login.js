const Usuario = require('../../models/user/userModel')
const { reponsefallido, reponseExitoso } = require('../reponse/reponse')
const jwt = require('jsonwebtoken')
const config = require('../../Config/config')
const secret = config().secret
const { encrypt } = require('../../utils/encript')


/**
 *
 * @param {_id:string} req
 * @param {*} res
 */
const Login = async function (req, res) {
  const { email } = req.body
  let { password } = req.body


  if (!email || !password) {
    return reponsefallido(res, false, 'Usuario y contraseña son requeridos.')
  }

  password = await encrypt(password).encryptedData



  Usuario.findOne({ email, password })
    .exec(function (err, usuario) {
      if (err) {
        return reponsefallido(res, false, 'Usuario o correo No coinciden')
      } else {
        if (usuario != null) {
          const token = jwt.sign(
            { email: usuario.email, usuario: usuario.usuario, _id: usuario._id }, secret)
          usuario.password = ''
          const data = { usuario, token }
          return reponseExitoso(res, true, 'ok', data)
        } else {
          return reponsefallido(res, false, 'Usuario o correo No coinciden')
        }
      }
    })
}

module.exports = {
  Login
}
