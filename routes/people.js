const express = require('express');
const router = express.Router();

const peopleController = require('../controllers/people');

router.get('/', peopleController.getPeople);
router.get('/:id', peopleController.getSingle);

module.exports = router;