const numeric = require('./numeric');

module.exports = async function min(field, value, minNum) {
  // throw minNum;
  if (!(await numeric(field, minNum))) {
    throw `Seed in min rule for ${field} must be a number.`;
  }

  if (Number(value) < Number(minNum)) {
    return false;
  }

  return true;
};
