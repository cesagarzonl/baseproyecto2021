var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var usuario = new Schema({
	usuario:{type:String,require:"Es obliugatorio un usuario",maxlength:[50,"El usuario es muy largo"]},
	email:{type:String,require:"Es obliugatorio un correo",maxlength:[100,"El usuario es muy largo"]},
	password:{type:String,require:"Es obliugatorio un contraseña",minlength:[6,'Minimo 6 caracteres']}
});

var Usuario = mongoose.model("usuario",usuario);
module.exports = Usuario;