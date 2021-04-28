const Usuario = require('../../models/user/userModel')



let listUser = async function (req, res) {
        /*const user = new Usuario({	usuario:'usuario',
        email:'c@c.com ',
        password:'algo'}); 
        let usuarioNuevo = await user.save();
        console.log('usuarioNuevo',usuarioNuevo)*/
        Usuario.find({})
			.exec(function(err,usuario){
				if(err) {console.log(err);
				}else{
                    return res.status(200).json({
                        usuario
                    })
			    }
    })
  }
  
  module.exports = {
    listUser
  }