'use strict'
const express = require('express')
const router = express.Router()
const { validateTokenJWT } = require('../../middlewares/auth')
const {
    listanegocio,
    Crearnegocio,
    NegocioGetById
} = require('./negocio')

router.get('/', validateTokenJWT, listproductos)
router.post('/crear', validateTokenJWT, CrearProducto)
router.get('/byId/:_id', validateTokenJWT, ProductoGetById)

module.exports = router
