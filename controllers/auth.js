import bcrypt from 'bcrypt';

import User from '../models/user.js';
import { generateJWT } from '../helpers/jwt.js';

const registerUser = async (req, res) => {
    const { body } = req;
    console.log(body);

    try {

        const isUser = await User.findOne({ email: body.email });

        if (isUser) {
            return res.status(403).json({
                msg: 'Email already in use',
                // isUser: isUser
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(body.password, salt);

        const user = new User({ email: body.email, password: hashed, salt: salt });

        user.save();

        const jwt = await generateJWT(user._id);

        res.status(201).json({
            msg: 'User created',
            jwt
        });

    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
};

const login = async (req, res) => {
    const { body } = req;

    try {
        const user = await User.findOne({ email: body.email });

        if (!user) {
            return res.status(401).json({
                msg: 'User o password incorrect'
            });
        }

        const isMatch = await bcrypt.compare(body.password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                msg: 'User o password incorrect'
            });
        }

        const jwt = await generateJWT(user._id);

        res.status(200).json({
            jwt
        });

    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
};

export {
    login,
    registerUser
};