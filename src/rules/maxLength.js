const v = require('validator');

module.exports = async function maxLength(field, value, maxNum) {
  if (!v.isInt(maxNum)) {
    throw `Seed in maxLength rule for ${field} must be a number.`;
  }

  if (value.toString().length > parseInt(maxNum)) {
    return false;
  }

  return true;
};
