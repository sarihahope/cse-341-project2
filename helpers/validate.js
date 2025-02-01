// const Validator = require('validator.js');
// const validator = (body, rules, customMessages, callback) => {
//   const validation = new Validator(body, rules, customMessages);
//   validation.passes(() => callback(null, true));
//   validation.fails(() => callback(validation.errors, false));
// };

// module.exports = validator;

const validate = require('validate.js');

const validator = (body, rules, customMessages, callback) => {
  const validationResults = validate(body, rules, customMessages);
  
  if (validationResults) {
    // Validation failed
    callback(validationResults, false);
  } else {
    // Validation passed
    callback(null, true);
  }
};

module.exports = validator;
