'use strict'
const express = require('express')
const router = express.Router()

const {
    listUser,
    CrearUser,
    UserId
} =require('./user')


router.get('/',listUser)
router.get('/crear',CrearUser)
router.get('/edit/:_id',UserId)

module.exports = router