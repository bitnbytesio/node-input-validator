const { pathIndex } = require('../lib/ObjectIndex');
const numeric = require('./numeric');

module.exports = async function gte(field, value, anotherField) {
  const anotherFieldValue = pathIndex(this.inputs, anotherField);

  if (!(await numeric(field, anotherFieldValue))) {
    return false;
  }

  if (Number(value) >= Number(anotherFieldValue)) {
    return true;
  }

  return false;
};
