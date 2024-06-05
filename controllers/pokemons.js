import { response, request } from 'express';/*desestructuro esta prop de express para que a la hora de tipear el res, me indique las funcionalidades porque no las reconoce sino.*/
import { allPokemons } from '../db/db.js';
import { NewPokemon } from '../models/newPokemon.js';
import { RESPONSE_MESSAGES, HTTP_STATUS } from '../constants.js';



export const pokemonAll = (req, res = response) => {
     res.json({
        msg: RESPONSE_MESSAGES.LIST_ALL, /* 'Listado completo de Pokémones'*/
        allPokemons
    });
    console.log(allPokemons);
};


export const filterPokemonsByType = (req, res) => {
    if (req.validationError) {
        return res.status(req.validationError.status).json({msg: req.validationError.msg });
    }
        
    const { type } = req.query;
    const filteredPokemons = allPokemons.filter(pokemon => 
        pokemon.type.map(t => t.toLowerCase()).includes(type.toLowerCase())
    );

    if (filteredPokemons.length === 0) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({ msg: `${RESPONSE_MESSAGES.POKEMON_TYPE_NOT_FOUND} ${type}` });
    }
    res.json(filteredPokemons);
    
};


export const pokemonGet = (req, res = response) => {
    if (req.validationError) {
        return res.status(req.validationError.status).json({msg: req.validationError.msg });
    }
    
    
    res.json({ 
        msg: RESPONSE_MESSAGES.POKEMON_FOUND, /*'Pokémon encontrado'*/
        pokemon: req.pokemon
    });
        console.log(req.pokemon)
};


export const pokemonPut = (req, res = response) => {
    if (req.validationError) {
        return res.status(req.validationError.status).json({ msg: req.validationError.msg});
    }    

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
        msg: RESPONSE_MESSAGES.POKEMON_UPDATED,
        pokemon: allPokemons[pokemonIndex]
    });    
};


export const pokemonPost = (req, res = response) => {
    if (req.validationError) {
        return res.status(req.validationError.status).json({ msg: req.validationError.msg});
    }


    const { id, name, type, skills, image } = req.body;
    const newPokemon = new NewPokemon(id, name, type, skills, image);   
    allPokemons.push(newPokemon);   
        
    res.json({
        msg: RESPONSE_MESSAGES.POKEMON_CREATED,/*Tu nuevo pokemon ha sido creado.'*/
        newPokemon        
    }); 
    console.log(newPokemon);
};


export const pokemonDelete = (req, res = response) => {
    
    const id = parseInt(req.params.id);
    const index = allPokemons.findIndex(pokemon => pokemon.id === req.id);
    const deletedPokemon = allPokemons.splice(index, 1)[0]; 
    
    res.json({
        msg: RESPONSE_MESSAGES.POKEMON_DELETED, /*'Pokémon eliminado correctamente'*/
        deletedPokemon
    });
    console.log(deletedPokemon);
};



