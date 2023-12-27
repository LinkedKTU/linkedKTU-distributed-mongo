const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const loaders = require('./loaders');
const errorHandler = require('./middlewares/error-handler.middleware');
const events = require('./events');
require('dotenv').config();

loaders();

events();

const app = express();
app.use(express.json());

app.use(cors({ origin: '*' }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

const PORT = process.env.PORT;

app.get('/', (req, res) => {
    res.send('welcome');
});

app.use('/students', routes.student);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
