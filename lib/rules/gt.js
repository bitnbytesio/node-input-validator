const { pathIndex } = require('../util/ObjectIndex');
const numeric = require('./numeric');

module.exports = function gt({ value, args }, validator) {
  const [anotherField] = args;
  const anotherFieldValue = pathIndex(validator.inputs, anotherField);

  if (!numeric({ value })) {
    return false;
  }

  if (Number(value) > Number(anotherFieldValue)) {
    return true;
  }

  return false;
};
