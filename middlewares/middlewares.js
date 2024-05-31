import { allPokemons } from "../db/db.js";


export const validatePokemonId = (req, res, next) => {
    
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ msg: 'ID de Pokémon no válido' });
    }
    req.id = id; // Guardar el ID validado en req para usarlo en el siguiente middleware o controlador
    
    next();
};

export const checkPokemonExists = (req, res, next) => {
    const id = req.id;
    const pokemon = allPokemons.find(p => p.id === id);
    if (!pokemon) {
        return res.status(404).json({ msg: 'Pokémon no encontrado' });
    }
    req.pokemon = pokemon; // Guardar el Pokémon encontrado en req para usarlo en el controlador
    
    next();
};

export const validatePokemonData = (req, res, next) => {
    const { id, nombre, tipo, habilidades, imagen } = req.body;
    if (!id || !nombre || !tipo || !habilidades || !imagen) {
        return res.status(400).json({ msg: 'Faltan datos para crear o actualizar el Pokémon' });
    }
    
    next();
};