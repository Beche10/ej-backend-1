import { Router } from 'express';  // Aca desestructuro la funcion router de express
import { pokemonGet, pokemonPut, pokemonPost, pokemonDelete, pokemonAll, filterPokemonsByType } from '../controllers/pokemons.js';
//import { register } from '../controllers/auth.js';
import { checkPokemonExists, validatePokemonData, validatePokemonId, validatePokemonType } from '../middlewares/middlewares.js';


export const router = Router(); // inicializo la funcion de Router


router.get('/all', pokemonAll);

router.get('/type', validatePokemonType, filterPokemonsByType);

router.get('/:id', validatePokemonId, checkPokemonExists, pokemonGet);

router.put('/:id', validatePokemonId, checkPokemonExists, validatePokemonData, pokemonPut);

router.post('/', validatePokemonData, pokemonPost);

router.delete('/:id', validatePokemonId, checkPokemonExists, pokemonDelete);

//router.post('/auth/register', register);



export default router;

