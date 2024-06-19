import multiparty from 'connect-multiparty';
import { Router } from 'express';
import { createUser, getMe, getUsers, updateUser } from '../controllers/user.js';
import { asureAuth } from '../middlewares/authenticated.js';


const mdUpload = multiparty({ uploadDir: './uploads/avatar'});

export const usersRoutes = Router();


usersRoutes.get('/me', asureAuth, getMe);
usersRoutes.get('/all', asureAuth, getUsers);
usersRoutes.post('/user', asureAuth, mdUpload, createUser);
usersRoutes.patch('/:id', asureAuth, mdUpload, updateUser);


export default usersRoutes;

