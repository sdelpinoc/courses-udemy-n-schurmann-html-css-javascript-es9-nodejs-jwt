import { Router } from 'express';

import { login, registerUser } from '../controllers/auth.js';
import { checkErrors } from '../middlewares/check-errors.js';

import { validateJwt, checkJwt } from '../middlewares/jwt.js';
import { assignUser } from '../middlewares/user.js';

export const router = Router();
 
router.post('/register', registerUser);

router.post('/login', login);

router.get('/', [
    checkJwt,
    validateJwt,
    assignUser,
    checkErrors
], (req, res) => {
    // console.log('req.user: ', req.user);
    res.status(200).json({
        msg: `Valid jwt`
    });
});