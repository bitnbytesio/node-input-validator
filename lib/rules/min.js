const numeric = require('./numeric');

module.exports = function min({ attr, value, args }) {
  const [minNum] = args;
  // throw minNum;
  if (!numeric({ value: minNum })) {
    throw new Error(`Seed in min rule for ${attr} must be a number.`);
  }

  if (!numeric({ value: String(value) }) || Number(value) < Number(minNum)) {
    return false;
  }

  return true;
};
