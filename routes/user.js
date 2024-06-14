import { Router } from 'express';
import { createUser, getMe, getUsers } from '../controllers/user.js';
import { asureAuth } from '../middlewares/authenticated.js';


export const usersRoutes = Router();


usersRoutes.get('/me', asureAuth, getMe);
usersRoutes.get('/all', asureAuth, getUsers);
usersRoutes.post('/user', asureAuth, createUser);



export default usersRoutes;

