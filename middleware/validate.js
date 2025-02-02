const validate = require('validate.js');
const moment = require('moment');

const datetimeValidator = {
  dateOnly: function(value, options, key, attributes) {
    if (!value) return;
    const isValid = moment(value, 'YYYY-MM-DD', true).isValid();
    if (!isValid) {
      return `must be a valid date in format YYYY-MM-DD`;
    }
  }
};

const validateContact = (req, res, next) => {
  const validationRule = {
    firstName: {
      presence: { allowEmpty: false },
      format: {
        pattern: '^[A-Za-z]+$',
        message: 'can only contain letters'
      }
    },
    lastName: {
      presence: { allowEmpty: false },
      format: {
        pattern: '^[A-Za-z]+$',
        message: 'can only contain letters'
      }
    },
    email: {
      presence: { allowEmpty: false },
      email: true
    },
    favoriteColor: {
      presence: { allowEmpty: false },
      format: {
        pattern: '^[A-Za-z]+$',
        message: 'can only contain letters'
      }
    },
    birthday: {
      datetime: datetimeValidator.dateOnly 
    }
  };

  validate(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next(); 
    }
  });
};


const validatePeople = (req, res, next) => {
  const validationRule = {
    firstName: {
      presence: { allowEmpty: false },
      format: {
        pattern: '^[A-Za-z]+$',
        message: 'can only contain letters'
      }
    },
    lastName: {
      presence: { allowEmpty: false },
      format: {
        pattern: '^[A-Za-z]+$',
        message: 'can only contain letters'
      }
    },
    randomDate: {
      datetime: datetimeValidator.dateOnly
    }
  };

  validate(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next(); 
    }
  });
};

module.exports = {
  validateContact,
  validatePeople
};