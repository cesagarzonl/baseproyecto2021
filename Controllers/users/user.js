const Usuario = require('../../models/user/userModel')
const { reponsefallido, reponseExitoso } = require('../reponse/reponse')
const jwt = require('jsonwebtoken')
const config = require('../../Config/config')
const secret = config().secret
const { encrypt } = require('../../utils/encript')
const { randomString } = require('../../utils/randomCode')
const { correoenvio } = require('../SendEmail/SendEmail')
/**
 * Lista todos los usuarios
 * @param {*} req
 * @param {*} res
 */
const listUser = async function (req, res) {
  Usuario.find({})
    .exec(function (err, usuario) {
      if (err) {
        return reponsefallido(res, false, 'Ocurrio algo inesperado.')
      } else {
        return reponseExitoso(res, true, 'ok', usuario)
      }
    })
}

/**
 * Crea usuario POST
 * @param {email:string,password:string,usuario:string} req
 * @param {*} res
 */
const CrearUser = async function (req, res) {
  const { email, usuario, _id } = req.body
  let { password } = req.body
  password = await encrypt(password).encryptedData

  if (_id === undefined || _id === null || _id === '') {
    const user = new Usuario({
      usuario,
      email,
      password
    })

    await user.save().then(data => {
      const token = jwt.sign({ email: data.email, usuario: data.usuario, _id: data._id }, secret)
      data.password = ''
      const datafinal = { usuario:data, token }

      return reponseExitoso(res, true, 'Bienvenido', {data:datafinal})

    }, err => {
      const menssaje = err
      return reponseExitoso(res, false, menssaje.message,)
    })
  } else {
    Usuario.findOneAndUpdate({ _id }, { email, password, usuario, _id })
      .exec(function (err, usuario) {
        if (err) {
          return reponsefallido(res, false, 'Ocurrio algo inesperado.')
        } else {
          const redireccion = '/user/edit/' + _id
          res.redirect(redireccion)
        }
      })
  }
}

/**
 * get user by id
 * @param {_id:string} req
 * @param {*} res
 */
const UserGetById = async function (req, res) {
  const { _id } = req.params
  Usuario.findOne({ _id })
    .exec(function (err, usuario) {
      if (err) {
        return reponsefallido(res, false, 'Ocurrio algo inesperado.')
      } else {
        return reponseExitoso(res, true, 'ok', usuario)
      }
    })
}

/**
 * Olvido contraseña
 * @param {_id:string} req
 * @param {*} res
 */
 const UserOlvidoClave = async function (req, res) {
  const { email } = req.body
  Usuario.findOne({ email })
    .exec(function (err, usuario) {
      if (err) {
        return reponsefallido(res, false, 'Ocurrio algo inesperado.')
      } else {

        if(!usuario){
          return reponsefallido(res, false, 'El correo '+email+' No existe en nuestros registros')
        }
        let dd = randomString(10)
        usuario.password = encrypt(dd).encryptedData
        usuario.cambioPW = true
        usuario.save(async function (err, usuario) {
          if (err) {
            return reponsefallido(res, false, err)
          } else {
            let envioCorreo = await correoenvio(email,'<p>Nueva Calve :'+dd+' </p>')
            if  (envioCorreo){
              return reponseExitoso(res, true, 'Se ha iniciado proceso de cambio de cambio de clave, le llegara un correo a '+email,null)
            }else{
              return reponseExitoso(res, true, 'ok', usuario)
            }
          }
        })
      }
    })
}

module.exports = {
  listUser,
  CrearUser,
  UserGetById,
  UserOlvidoClave
}
