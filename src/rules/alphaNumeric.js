const v = require('validator');

module.exports = async function alphaNumeric(field, value) {
  if (!v.isAlphanumeric(String(value))) {
    return false;
  }

  return true;
};
