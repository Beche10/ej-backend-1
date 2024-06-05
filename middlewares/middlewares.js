import { allPokemons } from '../db/db.js';
import { POKEMON_TYPES } from '../constants.js'; 
import { RESPONSE_MESSAGES, HTTP_STATUS } from '../constants.js';


export const validatePokemonId = (req, res, next) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        req.validationError = { msg: RESPONSE_MESSAGES.INVALID_ID };
    } else {
        req.id = id; 
    }
    next();
};

export const checkPokemonExists = (req, res, next) => {
    const id = req.id;
    const pokemon = allPokemons.find(p => p.id === id);
    if (!pokemon) {
        req.validationError = {status: HTTP_STATUS.NOT_FOUND, msg: RESPONSE_MESSAGES.POKEMON_NOT_FOUND};
    } else {
        req.pokemon = pokemon; 
    }
    next();
};

export const validatePokemonData = (req, res, next) => {
    const { id, name, type, skills, image } = req.body;
    if (!id || !name || !type || !skills || !image) {
        req.validationError = {status: HTTP_STATUS.BAD_REQUEST, msg: RESPONSE_MESSAGES.MISSING_DATA }
    }
    next();
};

export const validatePokemonType = (req, res, next) => {
    const { type } = req.query;
    if (type && !POKEMON_TYPES.map(t => t.toLocaleLowerCase()).includes(type.toLocaleLowerCase())){
        req.validationError = { status: HTTP_STATUS.BAD_REQUEST, msg: `${RESPONSE_MESSAGES.POKEMON_TYPE_NOT_FOUND} ${type}` }
    }
    next();
};