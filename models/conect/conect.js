const { MongoClient } = require('mongodb')
const dbName = 'testDB'

/* // Nombre de bd
// Conexión URL (estas corriendo en local :D)
const url = 'mongodb://localhost:27017';

const client = new MongoClient(url, {
  useUnifiedTopology: true
});

module.exports = async () => {
  // Conectamos al servidor
  await client.connect();

  return client.db(dbName); // retornamos la conexión con el nombre de la bd a usar
}; */

const mongoose = require('mongoose')
// colocamos la url de conexión local y el nombre de la base de datos
mongoose.connect('mongodb://localhost:27017/' + dbName, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:')) // enlaza el track de error a la consola (proceso actual)
db.once('open', () => {
  console.log('connected') // si esta todo ok, imprime esto
})
