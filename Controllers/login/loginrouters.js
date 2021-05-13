'use strict'
const express = require('express')
const router = express.Router()

const {
  Login
} = require('./login')

router.post('/', Login)

module.exports = router
