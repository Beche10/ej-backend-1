import { allPokemons } from '../db/db.js';
import { RESPONSE_MESSAGES, HTTP_STATUS } from '../utils/constants.js';
import { isValidPokemonId, isValidPokemonType } from '../utils/utils.js';


export const validatePokemonId = (req, res, next) => {
    const id = req.params.id;
    if (!isValidPokemonId(id)) {
        req.validationError = { 
            status: HTTP_STATUS.BAD_REQUEST,    
            msg: RESPONSE_MESSAGES.INVALID_ID,
        };
    } else {
        req.id = parseInt(id, 10); 
    }
    next();
};

export const checkPokemonExists = (req, res, next) => {
    const id = req.id;
    const pokemon = allPokemons.find(p => p.id === id);
    if (!pokemon) {
        req.validationError = {
            status: HTTP_STATUS.NOT_FOUND, 
            msg: RESPONSE_MESSAGES.POKEMON_NOT_FOUND
        };
    } else {
        req.pokemon = pokemon; 
    }
    next();
};

export const validatePokemonData = (req, res, next) => {
    const { id, name, type, skills, image } = req.body;
    if (!id || !name || !type || !skills || !image) {
        req.validationError = {
            status: HTTP_STATUS.BAD_REQUEST, 
            msg: RESPONSE_MESSAGES.MISSING_DATA 
        };
    }
    next();
};

export const validatePokemonType = (req, res, next) => {
    const { type } = req.query;
    if (type && !isValidPokemonType(type)) {
        req.validationError = { 
            status: HTTP_STATUS.BAD_REQUEST, 
            msg: `${RESPONSE_MESSAGES.POKEMON_TYPE_NOT_FOUND} ${type}`,
    };
  }
  next();
};