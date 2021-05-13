'use strict'
const express = require('express')
const router = express.Router()

const {
  listUser,
  CrearUser,
  UserGetById,
  CrearUserGet,
  UserIdEdit,
  UserIdEditPost
} = require('./user')

router.get('/', listUser)
router.get('/crear', CrearUserGet)
router.post('/crear', CrearUser)
router.get('/byId/:_id', UserGetById)
router.get('/edit/:_id', UserIdEdit)

module.exports = router
