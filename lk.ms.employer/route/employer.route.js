const express = require('express');
const employerController = require('../controllers/employer.controller');
const router = express.Router();

router.route('/').get(employerController.getEmployers);
router.route('/:id').get(employerController.getEmployerById);

module.exports = router;