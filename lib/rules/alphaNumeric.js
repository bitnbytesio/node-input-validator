const v = require('validator');

module.exports = function alphaNumeric({ value, args }) {
  if (!v.isAlphanumeric(String(value), ...args)) {
    return false;
  }

  return true;
};
