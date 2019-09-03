const v = require('validator');

module.exports = function ascii({ value }) {
  if (v.isAscii(String(value))) {
    return true;
  }

  return false;
};
