const v = require('validator');

module.exports = function alpha({ value }) {
  if (v.isAlpha(String(value))) {
    return true;
  }

  return false;
};
