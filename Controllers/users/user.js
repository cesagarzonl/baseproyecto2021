const Usuario = require('../../models/user/userModel')
const { reponsefallido, reponseExitoso } = require('../reponse/reponse')
const jwt = require('jsonwebtoken')
const config = require('../../Config/config')
const secret = config().secret
const { encrypt } = require('../../utils/encript')

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
          console.log(err)
        } else {
          const redireccion = '/user/edit/' + _id
          res.redirect(redireccion)
        }
      })
  }
}

/**
 *
 * @param {_id:string} req
 * @param {*} res
 */
const UserGetById = async function (req, res) {
  const { _id } = req.params
  Usuario.findOne({ _id })
    .exec(function (err, usuario) {
      if (err) {
        console.log(err)
      } else {
        return res.status(200).json({
          usuario
        })
      }
    })
}

module.exports = {
  listUser,
  CrearUser,
  UserGetById
}
