'use strict'
const express = require('express')
const router = express.Router()
const { validateTokenJWT } = require('../../middlewares/auth')
const {
  listproductos,
  CrearProducto,
  ProductoGetById
} = require('./productosservicios')

router.get('/', listproductos)
router.post('/crear', validateTokenJWT, CrearProducto)
router.get('/byId/:_id', ProductoGetById)

module.exports = router
