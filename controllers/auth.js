import bcrypt from 'bcryptjs';
import { User } from '../models/user.js';
import { users } from '../models/user.js';

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
        
       
        // Agrego el nuevo usuario al array de usuarios //
        users.push(user);

        res.status(200).send({ msg: 'Usuario registrado exitosamente', user });
     

};


