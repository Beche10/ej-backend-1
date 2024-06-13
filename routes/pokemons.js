import { Router } from 'express';  // Aca desestructuro la funcion router de express
import { pokemonAll, filterPokemonsByType, pokemonGet, pokemonPut, pokemonPost, pokemonDelete } from '../controllers/pokemons.js';
import { validatePokemonId, checkPokemonExists, validatePokemonData, validatePokemonType } from '../middlewares/middlewares.js';


export const pokemonRoutes = Router(); // inicializo la funcion de Router


pokemonRoutes.get('/all', pokemonAll);

pokemonRoutes.get('/type', validatePokemonType, filterPokemonsByType);

pokemonRoutes.get('/:id', validatePokemonId, checkPokemonExists, pokemonGet);

pokemonRoutes.put('/:id', validatePokemonId, checkPokemonExists, validatePokemonData, pokemonPut);

pokemonRoutes.post('/', validatePokemonData, pokemonPost);

pokemonRoutes.delete('/:id', validatePokemonId, checkPokemonExists, pokemonDelete);




export default pokemonRoutes;

