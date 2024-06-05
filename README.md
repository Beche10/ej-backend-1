# ej-backend-1
Ejercitacion en backend - Ejercicio 1 - Pokedex

Etapa 1

1- Utilice el modulo de dotenv (.env) para crear variables de entorno.
2- La inicializacion quedaron almacenados en clases para mejorar la organizacion. (models)
3- Cree las rutas dentro del entorno del servidor.
4- Transforme la funciones en flecha.
5- Creacion de directorio de rutas (routers)
6- Creacion de directorio controllers para la funcionalidad de los rest endspoint
7- Creacion de funcionalidad CRUD

Etapa 2

- Funciones de Validación: isValidPokemonId, isValidPokemonType.
- Formato de Respuesta: formatResponse.
- Respuestas de Error: validationErrorResponse.
- Manejo de Errores: handleErrors.

Funciones de Validación:

- isValidPokemonId: Valida que el ID sea un número entero válido.
- isValidPokemonType: Verifica que el tipo de Pokémon esté en la lista de tipos permitidos.

Formato de Respuesta:

- formatResponse: Formatea las respuestas para estandarizarlas.

Manejo de Errores:

- validationErrorResponse: Envía una respuesta de error de validación.
- handleErrors: Middleware para manejo de errores global.