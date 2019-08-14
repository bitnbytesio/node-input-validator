const numeric = require('./numeric');

module.exports = async function max(field, value, maxNum) {
  if (!(await numeric(field, maxNum))) {
    throw `Seed in max rule for ${field} must be a number.`;
  }

  if (Number(value) > Number(maxNum)) {
    return false;
  }

  return true;
};
