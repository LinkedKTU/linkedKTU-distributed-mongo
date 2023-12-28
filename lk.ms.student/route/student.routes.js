const express = require('express');
const studentController = require('../controller/student.controller.js');
const router = express.Router();
const bodyValidator = require('../middlewares/body-validator.middleware');
const schema = require('../validations/student.validation');

router
    .route('/')
    .get(studentController.getStudents);

router
    .route('/:id')
    .get(studentController.getStudentById);

router
    .route('/technologies/:technology')
    .get(studentController.getStudentsByTechnology);


module.exports = router;