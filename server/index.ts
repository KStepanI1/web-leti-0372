import express from 'express';
const cors = require('cors');
import { router } from "./routes/index";
require('dotenv').config();

const APP_PORT: number = +process.env.APP_PORT || 5000;
const app = express();

 export const start = async () => {
    try {
        app.use(cors());
        app.use(express.json());
        app.use('/api', router);
        app.listen(APP_PORT, () => console.log('Server started on port ' + APP_PORT));
    } catch(error) {
        console.error('On start server error: ' + error);
    }
};

 start();