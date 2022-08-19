import jwt from 'jsonwebtoken';

const generateJWT = userId => {
    return new Promise((resolve, reject) => {
        const payload = { id: userId };
    
        jwt.sign(payload, process.env.SECRETORPRIVATE_KEY, {
            expiresIn: '4h'
        }, (error, token) => {
            if (error) {
                console.log(error);
                reject('Token could not be generated');
            } else {
                resolve(token);
            }
        });
    })
};

export {
    generateJWT
};