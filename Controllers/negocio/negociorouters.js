'use strict'
const express = require('express')
const router = express.Router()
const { validateTokenJWT } = require('../../middlewares/auth')
const {
    listanegocio,
    Crearnegocio,
    NegocioGetById,
    NegocioGetByUsuario
} = require('./negocio')

router.get('/', validateTokenJWT, listanegocio)
router.post('/crear', validateTokenJWT, Crearnegocio)
router.get('/byId/:_id', validateTokenJWT, NegocioGetById)
router.get('/empresasUser', validateTokenJWT,NegocioGetByUsuario)

NegocioGetByUsuario
module.exports = router
