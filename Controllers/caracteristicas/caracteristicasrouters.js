'use strict'
const express = require('express')
const router = express.Router()

const {
    listaCaracteristicas
} = require('./caracteristicas')

router.get('/', listaCaracteristicas)

module.exports = router
