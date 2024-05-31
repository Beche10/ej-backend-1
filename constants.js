const DB_USER = 'admin';
const DB_PASSWORD = 'admin123456';


export const RESPONSE_MESSAGES = {
    LIST_ALL: 'Listado completo de Pokémones',
    POKEMON_NOT_FOUND: 'Pokémon no encontrado',
    POKEMON_FOUND: 'Pokémon encontrado',
    POKEMON_UPDATED: 'Pokémon actualizado correctamente',
    POKEMON_CREATED: 'Tu nuevo Pokémon ha sido creado.',
    POKEMON_DELETED: 'Pokémon eliminado correctamente',
    MISSING_DATA: 'Faltan datos para crear el nuevo Pokémon',
    NO_UPDATE_DATA: 'No se ingresó ningún dato nuevo para actualizar el Pokémon',
    INVALID_ID: 'ID de Pokémon no válido'
};


export const HTTP_STATUS = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404
};


export const POKEMON_TYPES = ['Water', 'Fire', 'Grass', 'Electric', 'Psychic', 'Ice', 'Dragon', 'Dark', 'Fairy'];