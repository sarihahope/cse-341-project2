
// const express = require('express');
// const router = express.Router();
// // const { validatePeople } = require('../middleware/validate'); 
// const peopleController = require('../controllers/people');
// const { isAuthenticated } = require('../middleware/authenticate');

// router.get('/', peopleController.getPeople);
// router.get('/:id', peopleController.getSingle);

// router.post('/', isAuthenticated, peopleController.addPerson);
// router.put('/:id', isAuthenticated, peopleController.updatePerson);
// router.delete('/:id', isAuthenticated, peopleController.deletePerson);

// module.exports = router;

const express = require('express');
const router = express.Router();
const peopleController = require('../controllers/people');
const { isAuthenticated } = require('../middleware/authenticate');

const handleError = (res, error) => {
  if (error instanceof ValidationError) {
    return res.status(400).json({ error: error.message });
  }
  return res.status(500).json({ error: 'Internal Server Error' });
};

router.get('/', async (req, res) => {
  try {
    await peopleController.getPeople(req, res);
  } catch (error) {
    handleError(res, error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    await peopleController.getSingle(req, res);
  } catch (error) {
    handleError(res, error);
  }
});

router.post('/', isAuthenticated, async (req, res) => {
  try {
    await peopleController.addPerson(req, res);
  } catch (error) {
    handleError(res, error);
  }
});

router.put('/:id', isAuthenticated, async (req, res) => {
  try {
    await peopleController.updatePerson(req, res);
  } catch (error) {
    handleError(res, error);
  }
});

router.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    await peopleController.deletePerson(req, res);
  } catch (error) {
    handleError(res, error);
  }
});

module.exports = router;
