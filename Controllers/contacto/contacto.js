const Contacto = require('../../models/contacto/contactoservicio')
const { reponsefallido, reponseExitoso } = require('../reponse/reponse')

/**
 * Lista todos los Contactos
 * @param {*} req
 * @param {*} res
 */
const listContacto = async function (req, res) {
  Contacto.find({})
    .exec(function (err, contacto) {
      if (err) {
        return reponsefallido(res, false, 'Ocurrio algo inesperado.')
      } else {
        return reponseExitoso(res, true, 'ok', contacto)
      }
    })
}

/**
 * Crea Contacto POST
 * @param {email:string,password:string,Contacto:string} req
 * @param {*} res
 */
const CrearContacto = async function (req, res) {
  const { nombre,mensaje,correo,url,procesado, _id } = req.body
  if (_id === undefined || _id === null || _id === '') {
    const user = new Contacto({
        nombre,
        mensaje,
        correo,
        url,
    })
    await user.save().then(data => {
        return reponseExitoso(res, true, 'ok', {data:data})
    }, err => {
      console.log('err',err)
      const menssaje = err
      return reponsefallido(res, false, err)
    })
  } else {
    let ContactoLocal = await Negocio.findOne({ _id }).exec()
    if(ContactoLocal){
      ContactoLocal.procesado = procesado
      ContactoLocal.save(function (err, contacto) {
        if (err) {
          console.log('err',err)
          return reponsefallido(res, false, err)
        } else {
          return reponseExitoso(res, true, 'ok', {data:contacto})
        }
      })
    }
  }
}

/**
 *
 * @param {_id:string} req
 * @param {*} res
 */
const ContactoGetById = async function (req, res) {
  const { _id } = req.params
  Contacto.findOne({ _id })
    .exec(function (err, Contacto) {
      if (err) {
        console.log(err)
      } else {
        return res.status(200).json({
          Contacto
        })
      }
    })
}

module.exports = {
  listContacto,
  CrearContacto,
  ContactoGetById
}
