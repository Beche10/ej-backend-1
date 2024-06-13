
import bcrypt from 'bcryptjs';
import { User, usersDb} from '../models/users.js';
import { createAccessToken, createRefreshToken, decoded } from '../utils/jwt.js'; 


export const register = (req, res) => {
        
        const { firstname, lastname, email, password } = req.body;
       
        if (!email) return res.status(400).send({ msg: 'El email es obligatorio'});
        if (!password) return res.status(400).send({ msg: 'Las contraseña es obligatoria'});     
     
        console.log('Datos recibidos:', { firstname, lastname, email, password });
        
        const user = User.createUser(  
            firstname,
            lastname,
            email.toLowerCase(),
            password,
        );

        console.log(user);

        usersDb.push(user);         
        
        res.status(200).send({ msg: 'Usuario registrado exitosamente', user });
};


export const login = (req, res) => {
    const {email, password} = req.body;   
           
    if (!email) return res.status(400).send({ msg: 'El email es obligatorio' });
    if (!password) return res.status(400).send({ msg: 'Las contraseña es obligatoria'});
    
    const emailLowerCase = email.toLowerCase().trim();      
    
    console.log('Email procesado para la busqueda:', emailLowerCase);

    const user = usersDb.find( user => user.email.toLowerCase().trim() === emailLowerCase );
    
    if (!user) return res.status(400).send({ msg: 'Usuario no encontrado' });

    bcrypt.compare(password, user.password, (bcryptError, isMatch) => {
        console.log('Contraseña ingresada:', password);
        console.log('Hash almacenado:', user.password);
        console.log('Resultado de comparación:', isMatch);

        if (bcryptError) {
            return res.status(500).send({ msg: 'Error del servidor' });
        }
        if (!isMatch) {
            return res.status(400).send({ msg: 'La contraseña es incorrecta' });
        }
        if (!user.active) {
            return res.status(401).send({ msg: 'Usuario no activo' });
        }
    
        res.status(200).send({
            msg: 'Inicio de sesión exitoso',
            access: createAccessToken(user),
            refresh: createRefreshToken(user),
        });
    });    
};

    export const refreshAccessToken = (req, res) => {
        const { token } = req.body;          
        
        const decodedToken = decoded(token);

        if(!decodedToken) {
            return res.status(400).send({ msg: 'Token inválido o caducado' });
        }

        const { user_id } = decodedToken;
        
        const user = usersDb.find(user => user.id === user_id);

        if(!user) {
            return res.status(404).send({ msg: 'Usuario no encontrado' });
        }

        if(!user.active) {
            return res.status(401).send({ msg: 'Usuario no activo' });
        }

        const newAccessToken = createAccessToken(user);

        res.status(200).send({
            accessToken: newAccessToken,
        });        
};