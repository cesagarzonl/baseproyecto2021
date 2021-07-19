const Usuario = require('../../models/user/userModel')
const { reponsefallido, reponseExitoso } = require('../reponse/reponse')

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
  const { email, password, usuario, _id } = req.body
  if (_id === undefined || _id === null || _id === '') {
    const user = new Usuario({
      usuario,
      email,
      password
    })
    await user.save().then(data => {
      return res.status(200).json({
        usuarioNuevo: data
      })
    }, err => {
      const menssaje = err
      return res.status(201).json({
        menssaje: menssaje.message
      })
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
