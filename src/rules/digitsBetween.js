const numeric = require('./numeric');
const integer = require('./integer');

module.exports = async function digitsBetween(field, value, args) {
  // const isNumeric = numeric(field, value);

  if (!(await numeric(field, value))) {
    return false;
  }

  if (!Array.isArray(args) && args.length !== 2) {
    throw `The number of arguments for digits between rule in the field ${field} are invalid.`;
  }

  let [min, max] = args;

  if (!(await integer(field, min)) || !(await integer(field, max))) {
    throw `Seeds must be integer for ${field} under digits between rule.`;
  }


  min = parseInt(min);
  max = parseInt(max);

  if (min >= max) {
    throw `Seed min must be less then max in digits between rule for ${field}.`;
  }

  if (value.length < min || value.length > max) {
    return false;
  }

  return true;
};
