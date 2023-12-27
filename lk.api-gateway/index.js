const express = require('express');
const cors = require('cors');
// const routes = require('./routes');
// const loaders = require('./loaders');
// const errorHandler = require('./middlewares/error-handler.middleware');
// const events = require('./events');
require('dotenv').config();
const { redirectRequest } = require("./scripts/redirect");

// loaders();

// events();

const app = express();
app.use(express.json());

app.use(cors({ origin: '*' }));

app.use((req, res, next) => {
    redirectRequest(req, res, next);
});

const PORT = process.env.PORT;

app.get('/api/welcome/', (req, res) => {
    console.log('req.path: ', req.path);
    console.log('req.method: ', req.method);
    res.send('welcome');
});

// app.use('/students', routes.student);

// app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
