'use strict'
const ProductoServicio = require('../../models/productosservicios/productosservicios')
const { reponsefallido, reponseExitoso } = require('../reponse/reponse')
const { saveFile } = require('../../utils/savefile')
/**
 * Lista todos los usuarios
 * @param {*} req
 * @param {*} res
 */
const listproductos = async function (req, res) {
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
const CrearProducto = async function (req, res) {
  const { nombre,descripcion, _id,file,negocio } = req.body
  let user = req.user._id
  let imagen = null

  if(file != null && file != '' && file){

  }

  if (_id === undefined || _id === null || _id === '') {
    const producto = new ProductoServicio({
      nombre,
      user,
      descripcion,
      imagen,
      negocio
    })
    await producto.save().then(data => {
      if (file != null){
        imagen = saveFile(file,_id,'./public/imgusers/')
      }else{
        imagen = null
      }
      producto.imagen = imagen
      return reponseExitoso(res, true, 'ok', { productos: data })
    }, err => {
      const menssaje = err
      return reponsefallido(res, false, menssaje)
    })
  } else {
    imagen =  saveFile(file,_id,'./public/imgusers/')
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
const ProductoGetById = async function (req, res) {
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
  listproductos,
  CrearProducto,
  ProductoGetById
}
