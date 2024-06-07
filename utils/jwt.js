import jwt from 'jsonwebtoken';
import { DATA_USER_LOGIN } from './constants';

const createAccessToken = (user) => {
    const expToken = new Date();                     /* Seteo para que el  */ 
    expToken.setHours(expToken.getHours() + 3);      /*token expire en 3hs.*/

    const payload = {
        token_type: 'access',
        user_id: user._id,
        iat: Date.now(),
        exp: expToken.getTime(),
    }

    return jwt.sign(payload, DATA_USER_LOGIN.JWT_SECRET_KEY); 

};

export const createRefreshToken = (user) => {

    const expToken = new Date();                     /* Seteo para que el  */ 
    expToken.getMonth(expToken.getMonth() + 1);      /*token expire en 3hs.*/

    const payload = {
        token_type: 'refresh',
        user_id: user._id,
        iat: Date.now(),
        exp: expToken.getTime(),
    }

    return jwt.sign(payload, DATA_USER_LOGIN.JWT_SECRET_KEY); 

};

export const decoded = () => {};