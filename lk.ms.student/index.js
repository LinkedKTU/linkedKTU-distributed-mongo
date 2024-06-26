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
    console.log(`Received request on ${req.path}`);
    next();
});

// GET
app.get("/", controller.getStudents);
app.get("/:id", controller.getStudentById);
app.get("/email/:email", controller.getStudentByEmail);
app.get("/technologies/:technology", controller.getStudentsByTechnology);

// POST
app.post("/", controller.createStudent);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
