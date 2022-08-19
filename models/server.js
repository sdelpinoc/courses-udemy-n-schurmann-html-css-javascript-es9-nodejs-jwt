import express from 'express';
import { dbConnection } from '../database/config.js';

import { router as routerAuth } from '../routes/auth.js';
import { router as routerAnimals } from '../routes/animals.js';
// import { validateJSON } from '../helpers/validate-field.js';

export default class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth: '/auth',
            animals: '/animals'
        };

        this.connectDB();

        this.middlewares();

        this.routes();
    }

    connectDB() {
        dbConnection();
    }

    middlewares() {
        this.app.use(express.json());

        this.app.use(express.static('public'));

        // this.app.use(validateJSON);
    }

    routes() {
        this.app.use(this.paths.auth, routerAuth);
        this.app.use(this.paths.animals, routerAnimals);

        this.app.use('*', (req, res) => {
            res.status(404).send(`404 - Page not found`);
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running in port: ${this.port}`);
        });
    }
}