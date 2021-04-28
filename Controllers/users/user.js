const Usuario = require('../../models/user/userModel')


/**
 * Lista todos los usuarios
 * @param {*} req 
 * @param {*} res 
 */
let listUser = async function (req, res) {
    Usuario.find({})
      .exec(function(err,usuario){
				if(err) {
          return res.status(500).json({
            err
          })
				}else{
          return res.status(200).json({
            usuario
          })
			  }
    })
  }
/**
 * Crea usuario
 * @param {email:string,password:string,usuario:string} req 
 * @param {*} res 
 */
let CrearUser = async function (req, res) {
    let { email,password,usuario } = req.body
    email='',
    password='',
    usuario=''
    const user = new Usuario({
      usuario,
      email,
      password
    })
    let usuarioNuevo = await user.save().then(data=>{
      return res.status(200).json({
        usuarioNuevo:data
      })      
    },err=>{
      let menssaje = err
      return res.status(201).json({
        menssaje:menssaje.message
      })
    })

} 
/**
 * 
 * @param {_id:string} req 
 * @param {*} res 
 */
let UserId = async function (req, res) {
  let { _id } = req.params
  Usuario.find({_id})
    .exec(function(err,usuario){
      if(err) {
        console.log(err)
      }else{
        return res.status(200).json({
          usuario
        })
      }
    })
}

module.exports = {
    listUser,
    CrearUser,
    UserId
  }