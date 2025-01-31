const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate');
const peopleController = require('../controllers/people');
const {isAuthenticated} = require('../middleware/authenticate');

router.get('/', peopleController.getPeople);
router.get('/:id', peopleController.getSingle);
router.post('/', validation.savePeople, isAuthenticated, peopleController.addPerson);
router.put('/:id', validation.savePeople, isAuthenticated, peopleController.updatePerson);
router.delete('/:id', isAuthenticated , peopleController.deletePerson);


module.exports = router;