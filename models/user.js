import mongoose from "mongoose";

const { Schema, model } = mongoose;

const UserSchema = Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    }
});

const User = model('User', UserSchema);

export default User;