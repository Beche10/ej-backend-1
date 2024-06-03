import { response, request } from 'express';/*desestructuro esta prop de express para que a la hora de tipear el res, me indique las funcionalidades porque no las reconoce sino.*/
import { allPokemons } from '../db/db.js';
import { NewPokemon } from '../models/newPokemon.js';



export const pokemonAll = (req, res = response) => {
     res.json({
        msg: 'Listado completo de Pokémones',
        allPokemons
    });
    console.log(allPokemons);
};


export const filterPokemonsByType = (req, res) => {
    const { type } = req.query;
    const filteredPokemons = allPokemons.filter(pokemon => 
        pokemon.type.map(t => t.toLowerCase()).includes(type.toLowerCase())
    );

    if (filteredPokemons.length === 0) {
        return res.status(404).json({ message: `No se encontraron Pokémon de tipo ${type}` });
    }
    res.json(filteredPokemons);
    
};


export const pokemonGet = (req, res = response) => {
    res.json({ 
        msg: 'Pokémon encontrado',
        pokemon: req.pokemon
    });
        console.log(req.pokemon)
};


export const pokemonPut = (req, res = response) => {
    
    const { name, type, skills, image } = req.body;
    const pokemonIndex = allPokemons.findIndex(pokemon => pokemon.id === req.id);

    allPokemons[pokemonIndex] = {
        id: req.id,
        name,
        type,
        skills,
        image
    };
    
    res.json({
        msg: 'Pokémon actualizado correctamente',
        pokemon: allPokemons[pokemonIndex]
    });    
};


export const pokemonPost = (req, res = response) => {
    
    const { id, name, type, skills, image } = req.body;
    const newPokemon = new NewPokemon(id, name, type, skills, image);   
    allPokemons.push(newPokemon);   
        
    res.json({
        msg: 'Tu nuevo pokemon ha sido creado.',
        newPokemon        
    }); 
    console.log(newPokemon);
};


export const pokemonDelete = (req, res = response) => {
    
    const id = parseInt(req.params.id);
    const index = allPokemons.findIndex(pokemon => pokemon.id === req.id);
    const deletedPokemon = allPokemons.splice(index, 1)[0]; 
    
    res.json({
        msg: 'Pokémon eliminado correctamente',
        deletedPokemon
    });
    console.log(deletedPokemon);
};



