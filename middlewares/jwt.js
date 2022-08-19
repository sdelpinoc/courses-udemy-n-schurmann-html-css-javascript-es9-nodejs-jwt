import { expressjwt } from 'express-jwt';
import dotenv from 'dotenv';

dotenv.config();

const checkJwt = expressjwt({ secret: process.env.SECRETORPRIVATE_KEY, algorithms: ['HS256'] });

const validateJwt = (err, req, res, next) => {
    // console.log('error: ', err);
    // console.log(req.auth); 
    // { id: '62fe655352e5f9d55d136d60', iat: 1660840867, exp: 1660855267 }

    if (err.name === "UnauthorizedError") {
        return res.status(401).json({
            msg: 'Invalid token'
        });
    }

    if (!req.auth.id) {
        return res.status(401).json({
            msg: 'Invalid authorization token',
        });
    }

    next();
};

export {
    checkJwt,
    validateJwt
};