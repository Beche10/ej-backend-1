import { response, request } from 'express';/*desestructuro esta prop de express para que a la hora de tipear el res, me indique las funcionalidades porque no las reconoce sino.*/
import { allPokemons } from '../db/db.js';
import { NewPokemon } from '../models/newPokemon.js';
import { validatePokemonId, checkPokemonExists, validatePokemonData } from '../middlewares/middlewares.js'; 



export const pokemonAll = (req, res = response) => {
     res.json({
        msg: 'Listado completo de Pokémones',
        allPokemons
    });
    console.log(allPokemons);
};


export const pokemonGet = [validatePokemonId, checkPokemonExists, (req, res = response) => {
    res.json({ 
        msg: 'Pokémon encontrado',
        pokemon: req.pokemon
    });
        console.log(req.pokemon)
}];


export const pokemonPut = [validatePokemonId, checkPokemonExists, validatePokemonData, (req, res = response) => {
    
    const { nombre, tipo, habilidades, imagen } = req.body;
    const pokemonIndex = allPokemons.findIndex(pokemon => pokemon.id === req.id);

    allPokemons[pokemonIndex] = {
        id: req.id,
        nombre,
        tipo,
        habilidades,
        imagen
    };
    
    res.json({
        msg: 'Pokémon actualizado correctamente',
        pokemon: allPokemons[pokemonIndex]
    });
    (`Pokémon actualizado: ${JSON.stringify(allPokemons[pokemonIndex])}`); 
}];


export const pokemonPost = [validatePokemonData, (req, res = response) => {
    
    const { id, nombre, tipo, habilidades, imagen } = req.body;
    const newPokemon = new NewPokemon(id, nombre, tipo, habilidades, imagen);   
    allPokemons.push(newPokemon);   
        
    res.json({
        msg: 'Tu nuevo pokemon ha sido creado.',
        newPokemon        
    }); 
    console.log(newPokemon);
}];


export const pokemonDelete = [validatePokemonId, checkPokemonExists, (req, res = response) => {
    
    const id = parseInt(req.params.id);
    const index = allPokemons.findIndex(pokemon => pokemon.id === req.id);
    const deletedPokemon = allPokemons.splice(index, 1)[0]; 
    
    res.json({
        msg: 'Pokémon eliminado correctamente',
        deletedPokemon
    });
    console.log(deletedPokemon);
}];



