import User from '../models/user.js'

const assignUser = async (req, res, next) => {

    try {
        // console.log(req.auth);
        const { id } = req.auth;
    
        const user = await User.findById(id);
    
        if (!user) {
            return res.status(401).json({
                msg: `Authentication could not be verified`
            });
        }

        // Autenticated user
        req.user = user;

        next();
        
    } catch (error) {
        // console.log(error);
        // res.status(500).json(error.message);
        next(e);
    }
};

export {
    assignUser
};