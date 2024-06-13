import { Router } from 'express';
import { getMe } from '../controllers/user.js';
import { asureAuth } from '../middlewares/authenticated.js';


export const usersRoutes = Router();


usersRoutes.get('/me', asureAuth, getMe);



export default usersRoutes;

