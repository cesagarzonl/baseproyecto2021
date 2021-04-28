const express = require('express')
const router = express.Router()

const {
    listUser
} =require('./user')


router.get('/list',listUser)


module.exports = router