import jwt from 'jsonwebtoken';
import { decoded } from '../utils/jwt.js';


export const asureAuth = (req, res, next) => {
   
   if (!req.headers.authorization) {
    return res.status(403).send(
        { msg: 'La peticion no tiene la cabecera de autenticacion' })};
   
   const token = req.headers.authorization.replace('Bearer ', '');

    try {
     
        const payload = decoded(token);
        console.log(payload);
    
    } catch (error) {
     
        return res.status(400).send(
        { msg: 'token invalido' });  
    };
   

    next();
};