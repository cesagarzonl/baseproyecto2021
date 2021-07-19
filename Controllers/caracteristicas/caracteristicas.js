'use strict'
const Caracteristicas =  require('../../models/caracteristicas/caracteristicas')
const { reponsefallido, reponseExitoso } = require('../reponse/reponse')
const { saveFile } = require('../../utils/savefile')
/**
 * Lista todos los usuarios
 * @param {*} req
 * @param {*} res
 */
const listaCaracteristicas = async function (req, res) {
  Caracteristicas.find({})
    .exec(function (err, productos) {
      if (err) {
        console.log(err)
        return reponsefallido(res, false, 'Ocurrio algo inesperado.')
      } else {


        return reponseExitoso(res, true, 'ok', productos)
      }
    })
}








module.exports = {
    listaCaracteristicas
}
