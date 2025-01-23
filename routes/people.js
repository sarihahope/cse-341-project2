const express = require('express');
const router = express.Router();

const peopleController = require('../controllers/people');

router.get('/', peopleController.getPeople);
router.get('/:id', peopleController.getSingle);
router.post('/', peopleController.addPerson);
router.put('/:id', peopleController.updatePerson);
router.delete('/:id', peopleController.deletePerson);


module.exports = router;