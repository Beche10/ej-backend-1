import { Router } from 'express';  // Aca desestructuro la funcion router de express
import { pokemonGet, pokemonPut, pokemonPost, pokemonDelete, pokemonAll } from '../controllers/pokemons.js';


export const router = Router(); // inicializo la funcion de Router


router.get('/all', pokemonAll);

router.get('/:id', pokemonGet);

router.put('/:id', pokemonPut);

router.post('/', pokemonPost);

router.delete('/:id', pokemonDelete);




export default router;

