const v = require('validator');

module.exports = function maxLength({ attr, value, args }) {
  const [maxNum] = args;
  if (!v.isInt(maxNum)) {
    throw new Error(`Seed in maxLength rule for ${attr} must be a number.`);
  }

  if (value.toString().length > parseInt(maxNum)) {
    return false;
  }

  return true;
};
