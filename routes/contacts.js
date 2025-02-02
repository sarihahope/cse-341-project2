// const express = require('express');
// const router = express.Router();
// const contactsController = require('../controllers/contacts');
// const validation = require('../middleware/validate');
// const { validateContact, validatePeople } = require('../middleware/validate');

// router.get('/', contactsController.getContacts);
// router.get('/:id', contactsController.getSingle);
// router.post('/', validation.saveContact, isAuthenticated, contactsController.createContact);
// router.put('/:id', validation.saveContact, isAuthenticated, contactsController.updateContact);
// router.delete('/:id', isAuthenticated, contactsController.deleteContact);


// module.exports = router;
const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts');
const validation = require('../middleware/validate');
// const { validateContact } = require('../middleware/validate');
const {isAuthenticated} = require('../middleware/authenticate');

router.get('/', contactsController.getContacts);
router.get('/:id', contactsController.getSingle);


router.post('/', isAuthenticated, contactsController.createContact);
router.put('/:id', isAuthenticated, contactsController.updateContact);
router.delete('/:id', isAuthenticated, contactsController.deleteContact);

module.exports = router;