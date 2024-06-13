import { Router } from 'express';
import { register, login, refreshAccessToken } from '../controllers/auth.js';


export const authRoutes = Router();



authRoutes.post('/register', register);

authRoutes.post('/login', login);

authRoutes.post('/refreshAccessTtoken', refreshAccessToken);




export default authRoutes;

