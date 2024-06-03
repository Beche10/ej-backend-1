import { allPokemons } from "../db/db.js";
import { POKEMON_TYPES } from "../constants.js"; 


export const validatePokemonId = (req, res, next) => {
    
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ msg: 'ID de Pokémon no válido' });
    }
    req.id = id; 
    
    next();
};

export const checkPokemonExists = (req, res, next) => {
    const id = req.id;
    const pokemon = allPokemons.find(p => p.id === id);
    if (!pokemon) {
        return res.status(404).json({ msg: 'Pokémon no encontrado' });
    }
    req.pokemon = pokemon; 
    
    next();
};

export const validatePokemonData = (req, res, next) => {
    const { id, name, type, skills, image } = req.body;
    if (!id || !name || !type || !skills || !image) {
        return res.status(400).json({ msg: 'Faltan datos para crear o actualizar el Pokémon' });
    }
    
    next();
};

export const validatePokemonType = (req, res, next) => {
    const { type } = req.query;

    if (!POKEMON_TYPES.map(t => t.toLowerCase()).includes(type.toLowerCase())) {
        return res.status(400).json({ message: `Tipo de Pokémon inválido: ${type}` });
    }

    next();
};