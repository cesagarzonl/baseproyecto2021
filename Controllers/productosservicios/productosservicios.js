'use strict'
const ProductoServicio = require('../../models/productosservicios/productosservicios')
const Caracteristicas = require('../../models/caracteristicas/caracteristicas')
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
  const { nombre,descripcion, _id,file,negocio ,caracteretisticas} = req.body

  let user = req.user._id
  let imagen = null

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
        imagen = saveFile(file,data._id,'./public/imgusers/')
      }else{
        imagen = null
      }
      let _idUpdate = data._id

      ProductoServicio.findOneAndUpdate({ _id:_idUpdate }, { imagen })
      .exec(function (err, productos) {
        if (err) {
          return reponsefallido(res, false, err)
        } else {
          return reponseExitoso(res, true, 'ok', { productos })
        }
      })

    }, err => {
      const menssaje = err
      return reponsefallido(res, false, menssaje)
    })
  } else {
    if (imagen != null){
      imagen =  saveFile(file,_id,'./public/imgusers/')
    }

    let prodSer = await ProductoServicio.findOne({ _id }).exec()
    if(prodSer){
      prodSer.nombre = nombre
      prodSer.descripcion = descripcion
      if(imagen != null){
        prodSer.imagen = imagen
      }
      for (let index = 0; index < caracteretisticas.length; index++) {
        const element = caracteretisticas[index];
        const carac = new Caracteristicas({
          productoServicio:_id,
          descripcion:element,
          usuario:user,
        })
        carac.save()      
      }

      prodSer.save(function (err, productos) {
        if (err) {
          return reponsefallido(res, false, err)
        } else {
          return reponseExitoso(res, true, 'ok', productos)
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
const ProductoGetById = async function (req, res) {
  const { _id } = req.params
  let caracteristicas = await Caracteristicas.find({productoServicio:_id}).exec()
  ProductoServicio.findOne({ _id })
    .exec(function (err, producto) {
      if (err) {
        return reponsefallido(res, false, err)
      } else {
        return reponseExitoso(res, true, 'ok', {producto,caracteristicas})
      }
    })
}

module.exports = {
  listproductos,
  CrearProducto,
  ProductoGetById
}
