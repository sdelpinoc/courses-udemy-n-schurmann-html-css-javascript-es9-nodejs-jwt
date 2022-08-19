import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const animalSchema = Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
});

const Animal = model('Animal', animalSchema);

export default Animal;