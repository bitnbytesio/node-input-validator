const v = require('validator');

module.exports = function minLength({ attr, value, args }) {
  const [minNum] = args;
  if (!v.isInt(minNum)) {
    throw new Error(`Seed in minLength rule for ${attr} must be a number.`);
  }

  if (value.toString().length < parseInt(minNum)) {
    return false;
  }

  return true;
};
