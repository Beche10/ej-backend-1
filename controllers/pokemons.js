const { response, request } = require('express')/*desestructuro esta prop de express para que a la hora de tipear el res, me indique las funcionalidades porque no las reconoce sino.*/
const allPokemons = require('../db/db'); 
const NewPokemon = require('../models/newPokemon');




const pokemonGet = (req, res = response) => {
 

     /*   
    if (id === undefined) {
        
        return res.json({
            msg: 'Lista completa de Pokémon',
            pokemons: allPokemons
        });
    }
     */
   
    const id = req.params.id; 
    
    const pokemon = allPokemons.find(p => p.id === parseInt(id)); 
    
    if (!pokemon) {
        
        return res.json({
        msg: 'Pokémon no existe' 
    });
    }

    console.log(allPokemons);
    
    res.json({ 
        msg: 'Pokémon encontrado',
        pokemon
    });
};


const pokemonPut = (req, res = response) => {
    
    const id = parseInt(req.params.id);
    const { nombre, tipo, habilidades, imagen } = req.body;

    if (!nombre && !tipo && !habilidades && !imagen) {
        return res.json({ 
            msg: 'No se ingresó ningún dato nuevo para actualizar el Pokémon'
        });
    }

    
    const pokemonIndex = allPokemons.findIndex(pokemon => pokemon.id === id);
    if (pokemonIndex === -1) {
        return res.json({
            msg: 'Pokémon no encontrado'
        });
    }

    
    allPokemons[pokemonIndex] = {
        id,
        nombre,
        tipo,
        habilidades,
        imagen
    };

    console.log(allPokemons);

    res.json({
        msg: 'Pokémon actualizado correctamente',
        pokemon: allPokemons[pokemonIndex]
    });
};


const pokemonPost = (req, res = response) => {
    
    const { id, nombre, tipo, habilidades, imagen } = req.body;
    
    const newPokemon = new NewPokemon(id, nombre, tipo, habilidades, imagen);   
    
    if (!id || !nombre || !tipo || !habilidades || !imagen) {
        return res.json({ 
            msg: 'Faltan datos para crear el nuevo Pokémon'
         });
    }


    allPokemons.push(newPokemon);   
    
    
    console.log(allPokemons);


    res.json({

        msg: 'Tu nuevo pokemon ha sido creado.',
        newPokemon
        
    }); 
};


const pokemonDelete = (req, res = response) => {
    
    const id = parseInt(req.params.id);
    
    const index = allPokemons.findIndex(pokemon => pokemon.id === id);
    
    
    if (index === -1) {
        return res.json({
            msg: 'Pokémon no encontrado'
        });
    }
        
    const deletedPokemon = allPokemons.splice(index, 1)[0]; 
    
    console.log(allPokemons);

    res.json({
        msg: 'Pokémon eliminado correctamente',
        deletedPokemon
    });
};



module.exports = {
    pokemonGet,
    pokemonPut,
    pokemonPost,
    pokemonDelete   
};