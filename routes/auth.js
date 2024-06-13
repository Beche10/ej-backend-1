import { Router } from 'express';
import { register, login, refreshAccessToken } from '../controllers/auth.js';


export const router = Router();



router.post('/auth/register', register);

router.post('/auth/login', login);

router.post('/auth/refreshAccessTtoken', refreshAccessToken);




export default router;

