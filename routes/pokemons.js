const { Router } = require('express');  // Aca desestructuro la funcion router de express
const { pokemonGet, pokemonPut, pokemonPost, pokemonDelete } = require('../controllers/pokemons');


const router = Router(); // inicializo la funcion de Router


router.get('/:id', pokemonGet);

router.put('/:id', pokemonPut);

router.post('/', pokemonPost);

router.delete('/:id', pokemonDelete);




module.exports = router;

