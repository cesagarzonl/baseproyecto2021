'use strict'
const nodemailer = require('nodemailer')
module.exports = function config () {
  const configEmail = nodemailer.createTransport({
    // host: 'smtp.gmail.com', // account.smtp.host,
    // port: 465, // account.smtp.port,
    // secure: true, // account.smtp.secure,
    service: 'gmail',
    auth: {
      user: 'cesar.garzon@parquesoftbogota.com',
      pass: 'bcxhqldqdzfrvqbi'
    }//
    // debug: true, // show debug output
  // logger: true // log information in console
  })
  const ambiente = ''
  const config = {
    // Permisos mailgun
    encryptionMethod: 'AES-256-CBC',
    secretEncript: 'My32charPasswordAndInitVectorStr',
    desarrollo: true,
    public: '',
    port: 3000,
    secure: false,
    charset: 'utf8',
    configmysql: {
      database: process.env.DB_NAME || 'database',
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '123456',
      host: process.env.DB_HOST || '0.0.0.0',
      port: 3307,
      dialect: 'mysql',
      logging: false,
      freezeTableName: false,
      // setup:false,   si setup esta en true borrara todas las base de datos y las bolvera a crear
      // logging: s => console.log(s), //muestra todo lo de la base de datos
      define: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: true
      }
    },
    transporter: configEmail,
    // Rango de paginacion
    rango: 15, // rango paginacion
    urlLocal: '',
    secret:'Gato'
  }

  return config
}
