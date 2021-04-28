var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var usuario = new Schema({
	usuario:{type:String,require:true},
	email:{type:String,require:true},
	password:{type:String,require:true}
});

var Usuario = mongoose.model("usuario",usuario);
module.exports = Usuario;