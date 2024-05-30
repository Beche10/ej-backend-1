const express = require('express');
const cors = require('cors');



class Server {
     
    // inicializo el servidor a traves de un constructor q va a generar la instancia inicial
     constructor() {
     
     //creando una propiedades en la clase de servidor
     this.app = express(); 
     this.port = process.env.PORT;  
     this.pokemonesPath = '/api/pokemones' // la reemplaze para q se pueda ver mejor y se intuya las rutas

     
     //Middlewares - Metodos personalizados para cuando inicialice el servidor
     this.middlewares();   

     //Rutas
     this.routes();
    };
     
    
    // use, palabra clave para identificar un middleware
      middlewares() {
        this.app.use( cors() ); //cors: le doy permiso a los navegadores.
        this.app.use( express.static('public') ); //directorio publico - tengo el index y lo que los usuarios pueden ver.
        this.app.use( express.json() ); // Lectura y parseo del body.                               
    };


    routes() {
    
        this.app.use( this.pokemonesPath, require('../routes/pokemons') );
        /*Aca estoy usando un middleware*/  
    };


    listen() {
        this.app.listen(this.port);
    };
};



module.exports = Server;