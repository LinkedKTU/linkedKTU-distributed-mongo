const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { redirectRequest } = require("./scripts/redirect");

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

app.use((req, res, next) => {
    redirectRequest(req, res, next);
});

const PORT = process.env.PORT;

app.get('/api/welcome/', (req, res) => {
    console.log('req.path: ', req.path);
    console.log('req.method: ', req.method);
    res.send('welcome');
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
