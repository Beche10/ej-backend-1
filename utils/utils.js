import { POKEMON_TYPES, HTTP_STATUS, RESPONSE_MESSAGES } from './constants.js';


export const isValidPokemonId = (id) => {
    const parsedId = parseInt(id, 10);
    return !isNaN(parsedId) && parsedId > 0;
};


export const isValidPokemonType = (type) => {
    return POKEMON_TYPES.map(t => t.toLowerCase()).includes(type.toLowerCase());
};

/* Formato de respuesta estándar */
export const formatResponse = (status, message, data = null) => {
    return {
        status,
        message,
        data,
    };
};

/* Responder con un error de validación */
export const validationErrorResponse = (res, error) => {
    return res.status(error.status).json(formatResponse(error.status, error.msg));  
};

/* Manejo de errores */
export const handleErrors = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json(formatResponse(500, 'Internal Server Error'));
};