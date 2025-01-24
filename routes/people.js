const express = require('express');
const router = express.Router();
// const validation = require('../middleware/validate');
const peopleController = require('../controllers/people');
const {isAuthenticated} = require('../middleware/authenticate');

router.get('/', peopleController.getPeople);
router.get('/:id', peopleController.getSingle);
router.post('/', isAuthenticated, peopleController.addPerson);
router.put('/:id', isAuthenticated, peopleController.updatePerson);
router.delete('/:id', isAuthenticated , peopleController.deletePerson);


module.exports = router;