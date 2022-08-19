import { Router } from 'express';
import { body, param } from 'express-validator';

import { addAnimal, deleteAnimal, getAnimal, getAnimals, updateAnimal } from '../controllers/animals.js';
import { validateFields } from '../helpers/validate-field.js';
import { checkJwt, validateJwt } from '../middlewares/jwt.js';
import { assignUser } from '../middlewares/user.js';

export const router = Router();

router.get('/', [
    checkJwt,
    validateJwt,
    assignUser
], getAnimals);

router.post('/', [
    checkJwt,
    validateJwt,
    assignUser,
    body('name', 'Name is obligatory').notEmpty(),
    body('type', 'Type is obligatory').notEmpty(),
    validateFields
], addAnimal);

router.get('/:id', [
    checkJwt,
    validateJwt,
    assignUser,
    param('id').isMongoId(),
    validateFields
], getAnimal);

router.put('/:id', [
    checkJwt,
    validateJwt,
    assignUser,
    param('id').isMongoId(),
    validateFields
], updateAnimal);

router.delete('/:id', [
    checkJwt,
    validateJwt,
    assignUser,
    param('id').isMongoId(),
    validateFields
], deleteAnimal);