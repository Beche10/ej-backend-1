import express from 'express';
import cors from 'cors';
import { pokemonRoutes } from '../routes/pokemons.js';
import { handleErrors } from '../utils/utils.js';
import { authRoutes } from '../routes/auth.js';
import { usersRoutes } from '../routes/user.js';



export class Server {
     
    // inicializo el servidor a traves de un constructor q va a generar la instancia inicial
     constructor() {
     
     //creando una propiedades en la clase de servidor
     this.app = express(); 
     this.port = process.env.PORT;  
     this.pokemonesPath = '/api/pokemones' 
     this.authPath = '/api/auth';
     this.usersPath = '/api/users';   
     
     //Middlewares - Metodos personalizados para cuando inicialice el servidor
     this.middlewares();   

     //Rutas
     this.routes();
    };
     
    
    // use, palabra clave para identificar un middleware
      middlewares() {
        this.app.use( cors() ); //cors: le doy permiso a los navegadores.
        this.app.use( express.static('public') ); //directorio publico - Tengo el index y lo que los usuarios pueden ver.
        this.app.use( express.json() ); // Lectura y parseo del body.  
        this.app.use( handleErrors );// Middleware para manejo global de errores                             
    };


    routes() {
    
        this.app.use(this.pokemonesPath, pokemonRoutes);
        this.app.use(this.authPath, authRoutes);
        this.app.use(this.usersPath, usersRoutes);
        /*Aca estoy usando un middleware*/  
    };


    listen() {
        console.log('##########################');
        console.log('######## API REST ########');
        console.log('##########################');
        console.log(`http://localhost:${this.port}/`);
        this.app.listen(this.port);
    };
};



