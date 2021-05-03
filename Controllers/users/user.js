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
 * Crea usuario GEt
 * @param {email:string,password:string,usuario:string} req 
 * @param {*} res 
 */

let CrearUserGet = async function (req, res) {
      let usuario ={} 
      return res.render('./user/userCreate',{usuario})
}

/**
 * Crea usuario POST
 * @param {email:string,password:string,usuario:string} req 
 * @param {*} res 
 */
let CrearUser = async function (req, res) {
    let { email,password,usuario,_id } = req.body
    if (_id == undefined || _id == null || _id == "") {
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

    }else{
      Usuario.findOneAndUpdate({_id},{ email,password,usuario,_id })
        .exec(function(err,usuario){
          if(err) {
            console.log(err)
          }else{
            let redireccion = "/user/edit/"+_id
            res.redirect(redireccion)
          }
        })      
    }
} 


/**
 * 
 * @param {_id:string} req 
 * @param {*} res 
 */
let UserGetById = async function (req, res) {
  let { _id } = req.params
  Usuario.findOne({_id})
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

/**
 * 
 * @param {_id:string} req 
 * @param {*} res 
 */
let UserIdEdit = async function (req, res) {
  let { _id } = req.params
  Usuario.findOne({_id})
    .exec(function(err,usuario){
      if(err) {
        console.log(err)
      }else{
        return res.render('./user/userCreate',{usuario})

        /*return res.status(200).json({
          usuario
        })*/
      }
    })
}



module.exports = {
    listUser,
    CrearUser,
    UserGetById,
    CrearUserGet,
    UserIdEdit
  }