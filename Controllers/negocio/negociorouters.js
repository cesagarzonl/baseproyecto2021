'use strict'
const express = require('express')
const router = express.Router()
const { validateTokenJWT } = require('../../middlewares/auth')
const {
    listanegocio,
    Crearnegocio,
    NegocioGetById,
    NegocioGetByUsuario,
    NegociosProductosDestacados
} = require('./negocio')

router.get('/', listanegocio)
router.get('/misnegocios',validateTokenJWT, listanegocio)
router.post('/crear', validateTokenJWT, Crearnegocio)
router.get('/byId/:_id', NegocioGetById)
router.get('/empresasUser', validateTokenJWT,NegocioGetByUsuario)
router.get('/destacados',NegociosProductosDestacados)

NegocioGetByUsuario
module.exports = router
