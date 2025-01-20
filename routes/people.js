const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');

router.get('/', contactsController.getPeople);
router.get('/:id', contactsController.getSingle);
router.post('/', contactsController.createPeople);
router.put('/:id', contactsController.updatePeople);
router.delete('/:id', contactsController.deletePeople);


module.exports = router;