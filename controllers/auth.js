import bcrypt from 'bcryptjs';
import { User } from '../models/user.js';
import { users } from '../models/user.js';
import { createAccessToken, createRefreshToken, decoded } from '../utils/jwt.js'; 



export const register = (req, res) => {
        
        const { firstname, lastname, email, password } = req.body;
       
        if (!email) res.status(400).send({ msg: 'El email es obligatoro'});
        if (!password) res.status(400).send({ msg: 'Las contraseña es obligatoro'});
        

        const user = new User ({
                firstname,
                lastname,
                email: email.toLowerCase(),
                role: 'user',
                active: false,      
        });

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);
        user.password = hashPassword;
        
        users.push(user);

        res.status(200).send({ msg: 'Usuario registrado exitosamente', user });
};


export const login = (req, res) => {
    const {email, password} = req.body;    
    
    if (!email) res.status(400).send({ msg: 'El email es obligatorio' });
    if (!password) res.status(400).send({ msg: 'Las contraseña es obligatoria'});
    
    const emailLowerCase = email.toLowerCase();      
    
    const user = users.find(user => user.email.toLowerCase() === emailLowerCase);
      
    bcrypt.compare(password, user.password, (bcryptError, isMatch) => {
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
                access: createAccessToken(user),
                refresh: createRefreshToken(user),
         });
    });
};