'use strict'
const express = require('express')
const router = express.Router()
const { validateTokenJWT } = require('../../middlewares/auth')
const {
  listproductos,
  CrearProducto,
  ProductoGetById
} = require('./productosservicios')

router.get('/', validateTokenJWT, listproductos)
router.post('/crear', validateTokenJWT, CrearProducto)
router.get('/byId/:_id', validateTokenJWT, ProductoGetById)

module.exports = router
