/**
 *
 * @param {*} res
 * @param {200} status
 * @param {*} mensaje
 * @returns
 */

const reponsefallido = function (res, status, mensaje) {
  return res.status(200).json({
    status,
    mensaje
  })
}

/**
 *
 * @param {*} res
 * @param {*} status
 * @param {*} mensaje
 * @param {*} data
 * @returns
 */

const reponseExitoso = function (res, status, mensaje, data) {
  return res.status(200).json({
    status,
    mensaje,
    data
  })
}

module.exports = { reponsefallido, reponseExitoso }
