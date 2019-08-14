const v = require('validator');

module.exports = async function minLength(field, value, minNum) {
  if (!v.isInt(minNum)) {
    throw `Seed in minLength rule for ${field} must be a number.`;
  }

  if (value.toString().length < parseInt(minNum)) {
    return false;
  }

  return true;
};
