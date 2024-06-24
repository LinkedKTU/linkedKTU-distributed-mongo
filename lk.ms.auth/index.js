const express = require('express');
const cors = require('cors');
const app = express();

require('dotenv').config();

const controller = require("./controllers/index");

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
    // console.log(`Received request on ${req.path}`);
    next();
});

app.post("/verify/token", controller.verifyToken);

app.post("/student", controller.registerStudent);
app.post("/employer", controller.registerEmployer);
app.post("/lecturer", controller.registerLecturer);

app.post("/login", controller.commonLogin);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
