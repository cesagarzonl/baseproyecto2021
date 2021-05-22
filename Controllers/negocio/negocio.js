'use strict'
const Negocio = require('../../models/negocio/negocioservicio')
const { reponsefallido, reponseExitoso } = require('../reponse/reponse')
const { saveFile } = require('../../utils/savefile')
/**
 * Lista todos los usuarios
 * @param {*} req
 * @param {*} res
 */
const listanegocio = async function (req, res) {
  ProductoServicio.find({})
    .exec(function (err, productos) {
      if (err) {
        return reponsefallido(res, false, 'Ocurrio algo inesperado.')
      } else {
        return reponseExitoso(res, true, 'ok', productos)
      }
    })
}

/**
 * Crea usuario POST
 * @param {email:string,password:string,usuario:string} req
 * @param {*} res
 */
const Crearnegocio = async function (req, res) {
  const { nombre,descripcion, _id,file } = req.body
  let user = req.user._id
  let imagen = null

  if(file != null && file != '' && file){

  }

  if (_id === undefined || _id === null || _id === '') {
    const producto = new ProductoServicio({
      nombre,
      user,
      descripcion,
      imagen
    })
    await producto.save().then(data => {
      imagen =  saveFile(file,data._id,'./public/negocios/')
      return reponseExitoso(res, true, 'ok', { productos: data })
    }, err => {
      const menssaje = err
      return reponsefallido(res, false, menssaje)
    })
  } else {
    imagen =  saveFile(file,_id,'./public/imgusers/')
    console.log('imagen',imagen)
    ProductoServicio.findOneAndUpdate({ _id }, { nombre, descripcion, _id,imagen })
      .exec(function (err, productos) {
        if (err) {
          return reponsefallido(res, false, err)
        } else {
          return reponseExitoso(res, true, 'ok', productos)
        }
      })
  }
}

/**
   *
   * @param {_id:string} req
   * @param {*} res
   */
const NegocioGetById = async function (req, res) {
  const { _id } = req.params
  ProductoServicio.findOne({ _id })
    .exec(function (err, producto) {
      if (err) {
        return reponsefallido(res, false, err)
      } else {
        return reponseExitoso(res, true, 'ok', producto)
      }
    })
}

module.exports = {
    listanegocio,
    Crearnegocio,
    NegocioGetById
}
