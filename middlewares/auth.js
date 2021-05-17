'use strict'

const jwt = require('jsonwebtoken')
const config = require('../Config/config')

const secret = config().secret

const { reponsefallido, reponseExitoso } = require('../Controllers/reponse/reponse')

const middelwares = {
    validateTokenJWT: async function (req, res, next) {

        const auth = req.headers.authorization;
        console.log('auth',auth)
        if (auth) {
            const token = auth.split(' ')[1];
            let usuario
            try {
                usuario = jwt.verify(token, secret);
            } catch (error) {
                usuario = false;
            }
        if(usuario){
            req.user = usuario;
            console.log('usuario',usuario)
            next();
        }else{
            console.log('error')
            return reponsefallido(res, false, 'hubo un error intentalo mas tarde')
        }
        } else {
            console.log('error1')
            return reponsefallido(res, false, 'hubo un error intentalo mas tarde')
        }
    }
}
module.exports = middelwares
