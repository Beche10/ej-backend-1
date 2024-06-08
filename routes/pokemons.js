import { Router } from 'express';  // Aca desestructuro la funcion router de express
import { pokemonAll, filterPokemonsByType, pokemonGet, pokemonPut, pokemonPost, pokemonDelete } from '../controllers/pokemons.js';
import { validatePokemonId, checkPokemonExists, validatePokemonData, validatePokemonType } from '../middlewares/middlewares.js';
import { register, login } from '../controllers/auth.js';

export const router = Router(); // inicializo la funcion de Router


router.get('/all', pokemonAll);

router.get('/type', validatePokemonType, filterPokemonsByType);

router.get('/:id', validatePokemonId, checkPokemonExists, pokemonGet);

router.put('/:id', validatePokemonId, checkPokemonExists, validatePokemonData, pokemonPut);

router.post('/', validatePokemonData, pokemonPost);

router.delete('/:id', validatePokemonId, checkPokemonExists, pokemonDelete);

router.post('/auth/register', register);

router.post('/auth/login', login);



export default router;

