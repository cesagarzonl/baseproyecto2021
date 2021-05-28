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
  const { 
    nombre,
    descripcion,
    _id,
    file,
    correo,
    telefono,
    instagram,
    facebook,
    whatsapp,
    twitter } = req.body

  let usuario = req.user._id
  let imagen = null
  if(file != null && file != '' && file){

  }

  if (_id === undefined || _id === null || _id === '') {
    const producto = new Negocio({
      nombre,
      usuario,
      descripcion,
      imagen,
      correo,
      telefono,
      instagram,
      facebook,
      whatsapp,
      twitter
    })
    await producto.save().then(data => {
      if (file != null){
        imagen = saveFile(file,_id,'./public/negocios/')
      }else{
        imagen = null
      }

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

    let NegocioLocal = await Negocio.findOne({ _id }).exec()
    if(NegocioLocal){
      NegocioLocal.nombre = nombre
      NegocioLocal.descripcion = descripcion
      NegocioLocal.correo = correo
      NegocioLocal.telefono = telefono
      NegocioLocal.instagram = instagram
      NegocioLocal.facebook = facebook
      NegocioLocal.whatsapp = whatsapp
      NegocioLocal.twitter = twitter
      if(imagen != null){
        NegocioLocal.imagen = imagen
      }
      NegocioLocal.save(function (err, productos) {
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
