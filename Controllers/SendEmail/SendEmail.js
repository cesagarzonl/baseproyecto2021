const config = require('../../Config/config')
const transporter = config().transporter


var correoenvio = async function (email, cuerpo) {

    let promise  = new Promise( async function(resolve, reject){

  
        const message = {
          from: 'Inveniet <Inveniet@Inveniet.com>',
          to: email,
          subject: 'Inveniet',
          text: 'Inveniet',
          html: cuerpo
        }

        const info = await transporter.sendMail(message, (err, info) => {
            if (err) {
                console.log('correo para activar cuenta No fue enviado ')
                reject(false)
            }
            if (info) {
                resolve(true)
            }
        })


  
    })
    return promise
  
  }

  module.exports = {
    correoenvio
  }