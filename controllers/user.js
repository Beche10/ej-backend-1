import { usersDb } from '../models/users.js';


export const getMe = (req, res) => {

    const { user_id } = req.user;

    console.log(req.user);

    const user = usersDb.find(user => user.id === user_id);

    if (!user) { 
        return res.status(400).send({ msg: 'No se ha encontrado usuario'});
    } else {
        return res.status(200).send({ user });
    };
}; 

export const getUsers = (req, res) => {
    const { active } = req.query;
    
    let response = null;

    if(active === undefined) {
        response = usersDb;
    } else {
        const isActive = active.toLowerCase() === 'true';
        response = usersDb.filter(user => user.active === isActive);
    }
           
    return res.status(200).send({ response });
};

export const createUser = (req, res) => {

    console.log(req.body);


    return res.status(200).send({ msg: 'OK! createUser'});

};




