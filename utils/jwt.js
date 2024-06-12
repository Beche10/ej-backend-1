import jwt from 'jsonwebtoken';
import { DATA_USER_LOGIN } from '../utils/constants.js';

export const createAccessToken = (user) => {
    const expToken = new Date();                     /* Seteo para que el  */ 
    expToken.setHours(expToken.getHours() + 3);      /*token expire en 3hs.*/

    const payload = {
        token_type: 'access',
        user_id: user.id,
        iat: Date.now(),
        exp: expToken.getTime(),
    }

    return jwt.sign(payload, DATA_USER_LOGIN.JWT_SECRET_KEY); 
};

export const createRefreshToken = (user) => {

    const expToken = new Date();                      
    expToken.setMonth(expToken.getMonth() + 1);      

    const payload = {
        token_type: 'refresh',
        user_id: user.id,
        iat: Date.now(),
        exp: expToken.getTime(),
    }

    return jwt.sign(payload, DATA_USER_LOGIN.JWT_SECRET_KEY); 
};

export const decoded = (token) => {
    return jwt.decode(token, DATA_USER_LOGIN.JWT_SECRET_KEY, true);
};
