const fs = require('fs');
let saveFile = function (data,name,ubicacion){
  let valor = data.split(';')
  let final =valor[0].split('/')[1]
  const base64data = data.replace(/^data:.*,/, '');
  let nombreImagen = name+'.'+final
  let imagenubicacion = ubicacion+nombreImagen
  fs.writeFile(imagenubicacion, base64data, 'base64', (err,data) => {
    if (err) {
      console.log(err);
      err 
    } else {
      imagenubicacion
    }
  });
  return nombreImagen
}

module.exports.saveFile = saveFile