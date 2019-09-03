const { pathIndex } = require('../util/ObjectIndex');
const numeric = require('./numeric');

module.exports = function lt({ value, args }, v) {
  const [anotherField] = args;
  const anotherFieldValue = pathIndex(v.inputs, anotherField);

  if (!numeric({ value })) {
    return false;
  }

  if (Number(value) < Number(anotherFieldValue)) {
    return true;
  }

  return false;
};
