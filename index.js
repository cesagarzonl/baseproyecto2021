'use strict'

// const transferencia =  require('./transferencia')
// transferencia.ListaBancos('GET','/transfer/v1/bankList' )

const configserve = require('./Config/config')
const configmysql = configserve().configmysql
const PORT = configserve().port
const key = configserve().key
const cert = configserve().cert
const keyruta = configserve().keyruta
const certruta = configserve().certruta
const ca_root = configserve().ca_root
const ca_bundle = configserve().ca_bundle
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const fs = require('fs')
const https = require('https')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const conection = require('./models/conect/conect')
const usuarioRouter = require('./Controllers/users/userrouters')
const loginRouter = require('./Controllers/login/loginrouters')

if (process.env.NODE_ENV == 'production') {
  https.createServer({
    ca: [fs.readFileSync(ca_root), fs.readFileSync(ca_bundle)],
    key: fs.readFileSync(keyruta),
    cert: fs.readFileSync(certruta)
  }, app).listen(PORT, function () {
    console.log(`App listening on ${PORT} !`)
  })
} else {
  app.listen(PORT, async function () {
    console.log(`App listening on ${PORT} !`)
  })
}

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
  user: null
}))

app.use(cookieParser())
app.use(bodyParser.urlencoded({ parameterLimit: 100000, limit: '50mb', extended: true }))
app.use(bodyParser.json({ parameterLimit: 100000, limit: '50mb' }))

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

  // intercepts OPTIONS method
  if (req.method === 'OPTIONS') {
    // respond with 200
    res.sendStatus(200)
  } else {
    // move on
    next()
  }
})

app.set('views', path.join(__dirname, './views'))

app.set('view engine', 'pug')

app.use('/static', express.static(path.join(__dirname, './public')))

app.use('/user', usuarioRouter)
app.use('/login', loginRouter)

app.get('/', function (req, res) {
  return res.status(200).send({
    mensaje: 'algo'
  })
})

app.use((err, req, res, next) => {
  const content = req.headers['content-type']
  console.log('Error dice: ', err)
  if (content === 'application/json') {
    return res.status(500).send({
      exitoso: false,
      codigo: 500,
      mensaje: 'Hubo un error inténtelo mas tarde.',
      resultado: { novedad: err.message }
    }
    )
  }

  const menaje = err.message
  if (menaje != 'Intentelo mas tarde DB') {
    const novedad = 'Error'
    return res.render('error', { menaje, novedad })
  }
})
