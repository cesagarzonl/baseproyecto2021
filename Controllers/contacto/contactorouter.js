'use strict'
const express = require('express')
const router = express.Router()
const { validateTokenJWT } = require('../../middlewares/auth')
const {
  listContacto,
  CrearContacto,
  ContactoGetById
} = require('./contacto')

router.get('/',listContacto)
router.post('/crear', CrearContacto)
router.get('/byId/:_id', validateTokenJWT,ContactoGetById)

module.exports = router
