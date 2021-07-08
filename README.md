Inicio db
sudo systemctl start mongod.service

Estado del servicio 
sudo systemctl status mongod

Para inciiar en el arranque
sudo systemctl enable mongod

prueba conexxion de base de dato
mongo --eval 'db.runCommand({ connectionStatus: 1 })'


usuario contraseña


db.createUser(
  {
    user: "root",
    pwd: "123456",
    roles: [
       { role: "readWrite", db: "blog" }
    ]
  }
)

Iniciar proyecto : npm run local




acceso a la base de datos
mongo localhost/admin -u admin -p



Heroku 
heroku logs --tail --app shielded-atoll-87422
