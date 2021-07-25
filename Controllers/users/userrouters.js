'use strict'
const express = require('express')
const router = express.Router()
const { validateTokenJWT } = require('../../middlewares/auth')
const {
  listUser,
  CrearUser,
  UserGetById,
  UserOlvidoClave
} = require('./user')

router.get('/', /*validateTokenJWT,*/ listUser)
router.post('/crear', CrearUser)
router.get('/byId/:_id', UserGetById)
router.post('/olvido', UserOlvidoClave)
module.exports = router
