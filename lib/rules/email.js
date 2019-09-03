const v = require('validator');

module.exports = function email({ value }) {
  if (!v.isEmail(String(value))) {
    return false;
  }

  return true;
};
