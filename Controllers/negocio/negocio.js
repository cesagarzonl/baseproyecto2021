'use strict'
const Negocio = require('../../models/negocio/negocioservicio')
const ProductoServicio =  require('../../models/productosservicios/productosservicios')
const { reponsefallido, reponseExitoso } = require('../reponse/reponse')
const { saveFile } = require('../../utils/savefile')
/**
 * Lista todos los usuarios
 * @param {*} req
 * @param {*} res
 */
const listanegocio = async function (req, res) {
  Negocio.find({})
    .populate('usuario')
    .exec(function (err, productos) {
      if (err) {
        console.log(err)
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
  let usuario = req.user._id
  let imagen = null
  if(file != null && file != '' && file){

  }

  if (_id === undefined || _id === null || _id === '') {
    const producto = new Negocio({
      nombre,
      usuario,
      descripcion,
      imagen
    })
    await producto.save().then(data => {
      if (file != null){
        imagen = saveFile(file,_id,'./public/negocios/')
      }else{
        imagen = null
      }
      console.log(imagen)
      let _idUpdate = data._id
      Negocio.findOneAndUpdate({ _id:_idUpdate }, { imagen })
      .exec(function (err, productos) {
        if (err) {
          return reponsefallido(res, false, err)
        } else {
          return reponseExitoso(res, true, 'ok', productos)
        }
      })
    }, err => {
      const menssaje = err
      return reponsefallido(res, false, menssaje)
    })
  } else {
    if (file != null){
      imagen = saveFile(file,_id,'./public/negocios/')
    }else{
      imagen = null
    }
    Negocio.findOneAndUpdate({ _id }, { nombre, descripcion,imagen })
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
  let productos = await ProductoServicio.find({negocio:_id}).exec()
  Negocio.findOne({ _id })
    .exec(function (err, negocio) {
      if (err) {
        return reponsefallido(res, false, err)
      } else {
        return reponseExitoso(res, true, 'ok', {negocio,productos})
      }
    })
}

/**
   *
   * @param {_id:string} req
   * @param {*} res
   */
 const NegocioGetByUsuario = async function (req, res) {
  let usuario = req.user._id
  Negocio.find({ usuario })
    .exec(function (err, negocio) {
      if (err) {
        return reponsefallido(res, false, err)
      } else {
        return reponseExitoso(res, true, 'ok', {negocio})
      }
    })
}

/**
   *
   * @param {_id:string} req
   * @param {*} res
   */
 const NegociosProductosDestacados = async function (req, res) {
  const { _id } = req.params
  let productos = await ProductoServicio.find().limit(4).exec()
  Negocio.find()
    .limit(4)
    .exec(function (err, negocio) {
      if (err) {
        return reponsefallido(res, false, err)
      } else {
        return reponseExitoso(res, true, 'ok', {negocio,productos})
      }
    })
}




module.exports = {
    listanegocio,
    Crearnegocio,
    NegocioGetById,
    NegocioGetByUsuario,
    NegociosProductosDestacados
}
