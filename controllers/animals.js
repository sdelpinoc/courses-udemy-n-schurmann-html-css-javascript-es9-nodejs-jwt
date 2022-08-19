import Animal from '../models/animal.js';

const getAnimals = async (req, res) => {

    const [total, animals] = await Promise.all([Animal.countDocuments(), Animal.find(),]);

    res.status(200).json({
        total,
        animals
    });
};

const addAnimal = async (req, res) => {
    try {
        const { name, type } = req.body;

        const animal = new Animal({ name, type });

        await animal.save();

        res.status(201).json({
            msg: `Animal ${animal.name} added`,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: error.message
        });
    }
};

const getAnimal = async (req, res) => {
    const { id } = req.params;

    const animal = await Animal.findById(id);

    if (!animal) {
        return res.status(400).json({
            msg: 'Animal not found',
        });
    }

    res.status(200).json(animal);
};

const updateAnimal = async (req, res) => {
    const { id } = req.params;
    const { body } = req;

    const animal = await Animal.findByIdAndUpdate(id, body, { new: true }).catch(err => {
        res.status(400).send(err.message);
    });

    res.status(200).json(animal);
};

const deleteAnimal = async (req, res) => {
    const { id } = req.params;

    const animal = await Animal.findByIdAndDelete(id).catch(err => {
        res.status(400).send(err.message);
    });

    res.status(200).json({
        msg: `Deleted ${animal.name}`,
        animal
    });
};

export {
    getAnimals,
    addAnimal,
    getAnimal,
    updateAnimal,
    deleteAnimal
};