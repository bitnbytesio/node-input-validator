const numeric = require('./numeric');

module.exports = function max({ attr, value, args }) {
  const [maxNum] = args;
  if (!numeric({ value: maxNum })) {
    throw new Error(`Seed in max rule for ${attr} must be a number.`);
  }

  if (!numeric({ value: String(value) }) || Number(value) > Number(maxNum)) {
    return false;
  }

  return true;
};
