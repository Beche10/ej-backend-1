
import { Router } from 'express';
import { getMe } from '../controllers/user.js';


export const usersRoutes = Router();


usersRoutes.get('/me', getMe);



export default usersRoutes;

