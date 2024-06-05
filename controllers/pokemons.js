import { response, request } from 'express';/*desestructuro esta prop de express para que a la hora de tipear el res, me indique las funcionalidades porque no las reconoce sino.*/
import { allPokemons } from '../db/db.js';
import { NewPokemon } from '../models/newPokemon.js';
import { RESPONSE_MESSAGES, HTTP_STATUS } from '../utils/constants.js';
import { validationErrorResponse, formatResponse } from '../utils/utils.js';


export const pokemonAll = (req, res = response) => {
    res.json(formatResponse(HTTP_STATUS.OK, RESPONSE_MESSAGES.LIST_ALL, allPokemons));
    console.log(allPokemons);
};


export const filterPokemonsByType = (req, res) => {
    if (req.validationError) {
        return validationErrorResponse(res, req.validationError);
    }
        
    const { type } = req.query;
    const filteredPokemons = allPokemons.filter(pokemon => 
        pokemon.type.map(t => t.toLowerCase()).includes(type.toLowerCase())
    );

    if (filteredPokemons.length === 0) {
        return res.status(HTTP_STATUS.NOT_FOUND).json(formatResponse(
            HTTP_STATUS.NOT_FOUND,
           `${RESPONSE_MESSAGES.POKEMON_TYPE_NOT_FOUND} ${type}`   
        ));
    }
    res.json(formatResponse(HTTP_STATUS.OK, filteredPokemons));  
};


export const pokemonGet = (req, res = response) => {
    if (req.validationError) {
        return validationErrorResponse(res, req.validationError);
    }
    
    
    res.json(formatResponse(HTTP_STATUS.OK, RESPONSE_MESSAGES.POKEMON_FOUND, req.pokemon));
    console.log(req.pokemon)
};


export const pokemonPut = (req, res = response) => {
    if (req.validationError) {
        return validationErrorResponse(res, req.validationError);
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
    
    res.json(formatResponse(HTTP_STATUS.OK,RESPONSE_MESSAGES.POKEMON_UPDATED, allPokemons[pokemonIndex]));
};    


export const pokemonPost = (req, res = response) => {
    if (req.validationError) {
        return validationErrorResponse(res, req.validationError);
    }

    const { id, name, type, skills, image } = req.body;
    const newPokemon = new NewPokemon(id, name, type, skills, image);   
    allPokemons.push(newPokemon);   
        
    res.json(validationErrorResponse(HTTP_STATUS.OK, RESPONSE_MESSAGES.POKEMON_CREATED, newPokemon)); 
    console.log(newPokemon);
};


export const pokemonDelete = (req, res = response) => {
    if (req.validationError) {
        return validationErrorResponse(res, req.validationError);
    }
   
    const index = allPokemons.findIndex(pokemon => pokemon.id === req.id);
    const deletedPokemon = allPokemons.splice(index, 1)[0]; 
    
    res.json(formatResponse(HTTP_STATUS.OK, RESPONSE_MESSAGES.POKEMON_DELETED, deletedPokemon));
    console.log(deletedPokemon);
};



