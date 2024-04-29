require('dotenv').config();


const Server = require('./models/server');




//creacion instancia del servidor
const server = new Server();





//levantando servidor
server.listen();


 