// const express = require('express');
// const router = express.Router();
// const contactsController = require('../controllers/contacts');
// const validation = require('../middleware/validate');
// // const { validateContact } = require('../middleware/validate');
// const {isAuthenticated} = require('../middleware/authenticate');

// router.get('/', contactsController.getContacts);
// router.get('/:id', contactsController.getSingle);


// router.post('/', isAuthenticated, contactsController.createContact);
// router.put('/:id', isAuthenticated, contactsController.updateContact);
// router.delete('/:id', isAuthenticated, contactsController.deleteContact);

// module.exports = router;

const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

const handleError = (res, error) => {
  if (error instanceof ValidationError) {
    return res.status(400).json({ error: error.message });
  }
  return res.status(500).json({ error: 'Internal Server Error' });
};

router.get('/', async (req, res) => {
  try {
    await contactsController.getContacts(req, res);
  } catch (error) {
    handleError(res, error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    await contactsController.getSingle(req, res);
  } catch (error) {
    handleError(res, error);
  }
});

router.post('/', isAuthenticated, async (req, res) => {
  try {
    await contactsController.createContact(req, res);
  } catch (error) {
    handleError(res, error);
  }
});

router.put('/:id', isAuthenticated, async (req, res) => {
  try {
    await contactsController.updateContact(req, res);
  } catch (error) {
    handleError(res, error);
  }
});

router.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    await contactsController.deleteContact(req, res);
  } catch (error) {
    handleError(res, error);
  }
});

module.exports = router;